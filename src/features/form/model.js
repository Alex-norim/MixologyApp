import Validator from "../validator.js";
export const Model = {
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
    signInFormHandler : function (e , redrawMenu , root) {
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
                    header.append(redrawMenu);
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
        let errorMessageNest = form.querySelector('.error-message');
        let isValid = () => {
            let response = true ;
            for (const key in credentials) {
                let iterator = credentials[key];
                typeof iterator === 'object' || typeof iterator === 'undefined' ? 
                response = false : '';
            };
            return response;
        };
        // should develope a function to compore passwords
        let comparePaswords = ( credentials.password === credentials.confirmPassword && 
                                credentials.password.length !== 0 && 
                                credentials.confirmPassword.length !== 0);
        if( isValid() && comparePaswords ) {
            console.log('credent are valid')
            console.log(credentials)
            fetch("/registration/signup" , {
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
                errorMessageNest.style.color = 'green';
                success === true ? 
                    form.parentNode.remove() :
                    errorMessageNest.style.color = 'red' ;
                errorMessageNest.textContent = message
            })
            .catch( err => {
                errorMessageNest.textContent = 'server not found'
            })
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
    }

}

