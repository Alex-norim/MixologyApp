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
        let errorMessage = event.currentTarget.parentNode.getElementsByClassName('error-message')[0];
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
    signInFormHandler : function (e) {
        e.preventDefault();
        console.log('sign iiinnnn')
        let form    = e.currentTarget;
        let closeFormButton = form.querySelector('.closeFormButton');
        let errorMessage = form.getElementsByClassName('error-message')[0];
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
            .then( body => {
                let isLogIn  = body.exist;
                
                //check the user has been logged in successfully
                if(isLogIn){
                    let response = body.response[0];
                    let login = response.login;
                    let name    = response.name;
                    // save user's data
                    localStorage.setItem("name" , name);
                    localStorage.setItem("login" , login);
                    errorMessage.innerHTML = 'user has been logged successfully';
                    closeFormButton.click();
                }else{
                    errorMessage.innerHTML = body.error;
                }
            })
            .catch( err => {
                console.log("some error after submiting")
                throw err
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
        let mouseIsPressed = false;
        element.addEventListener('mousedown' , (event) => {
            mouseIsPressed = true;
            let currentElement = event.currentTarget;
            currentElement.ondragstart = function() {
                return false;
            };
            let shiftX = event.clientX - currentElement.offsetWidth 
            let shiftY = event.clientY - currentElement.offsetHeight
            
            document.onmousemove = (event) => {
                console.log(shiftX , shiftY)
                let pageX = event.pageX;
                let pageY = event.pageY;
                if(mouseIsPressed === true){
                    currentElement.style.left = pageX - shiftX + 'px';
                    currentElement.style.top = pageY  - shiftY + 'px';
                }
            }
        });
        element.addEventListener('mouseup' , () => {
            document.onmousemove = null;
            mouseIsPressed = false;
        
        })
        return element;
    }

}

