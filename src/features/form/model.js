import Validator from "../validator.js";
import { Menu } from '../menu/menu.js';
export const Model = {
    checkSubscribe : function(event){
        const wrap = event.currentTarget;
        const checkbox = wrap.querySelector('input[type=checkbox]');
        const isChecked = checkbox.checked;
        isChecked == true ? 
            this.currentFieldData['subscribe'] = 1 :
            this.currentFieldData['subscribe'] = 0 ;
    },
    saveUserInput : function(event){
        let target = event.target;
        let value  = target.value;
        let targetType = event.target.attributes.type.nodeValue;
        let name   = target.name;
        const initValidator = new Validator(value , targetType);
        const isValidData = initValidator.getErrors()[0];
        
        if( typeof isValidData === 'object'){
            this.currentFieldData[name] = isValidData ;
        }else{
            this.currentFieldData[name] = value ;
        }
    },
    formErrorHandler: (event) => {
        let errorMessage = event.currentTarget.parentNode.querySelector('.error-message');
        let target = event.target;
        let value  = target.value; 
        let targetType = event.target.attributes.type.nodeValue.toString();
        const initValidator = new Validator(value , targetType);
        const isValidData = initValidator.getErrors()[0];
        
        if(typeof isValidData === 'object') {
            errorMessage.textContent = isValidData.error;
            target.style.color = 'red'
            errorMessage.style.color = 'red';
        }else {
            target.style.color = ''
            target.style.color = '';
            errorMessage.textContent = '';
        }      
    },
    closeForm : function(event){
        let target = event.currentTarget.parentNode.parentNode;
            target.remove();
    },
    clearUserCredentials : function (event) {
        this.currentFieldData = {};
    },
    signInFormHandler : function (e , root) {
        e.preventDefault();
        let form    = e.currentTarget;
        let closeFormButton = form.querySelector('.closeFormButton');
        let errorMessage = form.querySelector('.error-message');
        const oldMenu = root.querySelector('.mainMenuWrap');
        const header = root.querySelector('header');
        let credentials = this.currentFieldData;
        let isvalid = () => {
            let response;
            for (const key in credentials) {
                const element = credentials[key];
                typeof element === 'object' || typeof element === 'undefined' ? 
                response = false : response = true ;
            }
            return response;
        }
        
        isvalid() ? 
            fetch( "/auth/signin" , {
                method:'POST',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify( credentials ) 
            })
            .then(result => {
                credentials = {};
                form.reset();
                return result.json();
            })
            .then( result => {
                let isLogIn  = result.exist;
                //check the user has been logged in successfully
                if(isLogIn){
                    let credentials = result.response;
                    let login = credentials.login;
                    let name    = credentials.name;
                    // save user's data
                    localStorage.setItem("name" , name);
                    localStorage.setItem("login" , login);
                    errorMessage.innerHTML = 'user has been logged successfully';
                    oldMenu.remove();
                    let NewMenu = new Menu(root)
                    header.append(NewMenu);
                    closeFormButton.click();
                }else{
                    errorMessage.innerHTML = "db not found";
                }
            })
            .catch( err => {
                errorMessage.textContent = "some error after submiting";
            })
            // else
            : '' 
        ;
    } ,
    signUpFormHandler : function (event){
        event.preventDefault();
        let form = event.currentTarget;
        let credentials = this.currentFieldData;
        let errorMessage = form.querySelector('.error-message');
        let isValid = () => {
            let response = true ;
            for (const key in credentials) {
                let iterator = credentials[key];
                typeof iterator === 'object' || typeof iterator === 'undefined' ? 
                response = false : '';
            };
            return response;
        };
        
        let comparePaswords =   credentials.password === credentials.confirmPassword 
                                    && !credentials.password === false;
        
        if( isValid() && comparePaswords ) {
            fetch("/auth/signup" , {
                method : 'POST' ,
                headers : {
                    'content-type' : 'application/json'
                } ,
                body : JSON.stringify(credentials)
            })
            .then( result => {
                return result.json();
            })
            .then( result => {
                let success = result.isRegistered;
                let message = result.message;
                errorMessage.style.color = 'green';
                success === true ? 
                    form.parentNode.remove() :
                    errorMessage.style.color = 'red' ;
                    errorMessage.textContent = message
            })
            .catch( err => {
                errorMessage.textContent = 'db not found'
            })
        }else if( !isValid() ) {
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'please check previous inputs'
        }
    // end
    } ,
    bindMover : (elem) => {
        const element = elem ;
        function moveAt (el, x , y , rightEdge) {
            let left = x < 0 ? 0 : x > rightEdge ? rightEdge : x ;
            let top  = y < 0 ? 0 : y ;
            el.style.top  = top + 'px';
            el.style.left = left  + 'px';
        }
        element.ondragstart = function() {
            return false;
        };
        let mouseIsPressed = false;
        element.addEventListener('mousedown' , (event) => {
            const windowWidth = window.innerWidth;
            const isMoveable = event.target === element || event.target.tagName !== 'INPUT' || event.target.tagName !== 'A';
            mouseIsPressed = windowWidth >= 460 ? true : false;
            let currentElement = event.currentTarget;
            let shiftX  = event.screenX - currentElement.getBoundingClientRect().left;
            let shiftY  = event.screenY - 103 - currentElement.getBoundingClientRect().top ;
            let elementWidth = currentElement.offsetWidth;
            document.onmousemove = (event) => {
                if(mouseIsPressed && isMoveable){
                    let pageX = event.clientX;
                    let pageY = event.clientY;
                    element.classList.remove('signInWrap')
                    element.style.position = 'absolute';
                    let x = pageX - shiftX;
                    let y = pageY - shiftY;
                    let rightEdge = document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth ;
                    moveAt(element , x , y , rightEdge - elementWidth )
                    
                }
            } ;
            element.addEventListener('mouseup' , () => {
                mouseIsPressed = false;
                document.onmousemove = null;
            })
        }, false);
        
        return element;
    },
    fillInputsByValid : function (){
        const currForm = this.root.querySelector('.form');
        const inputs = currForm.querySelectorAll('input');
        const errorMessage = currForm.querySelector('.error-message');
        const userData = this.currentFieldData;
        for (const input of inputs) {
            let InputType = input.getAttribute('name');
            let Value = userData[InputType];
            if( typeof Value === 'string'){
                input.value = Value;
            }else if (typeof Value === 'object'){
                delete userData[InputType];
            }
        }
    }

}

