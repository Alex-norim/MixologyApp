import ChangeDom from "./changeExistingElement";

function hangFormHandlerOn () {
    let _changeDOM = new ChangeDom(this.root);
    let registrationButton = this.root.getElementsByClassName('registration')[0];
    let localRoot = this.root.getElementsByClassName('body-content')[0];
    let getSignupForm = this.root.getElementsByClassName('getRegistrationForm')[0];
    let signInHandler = this.root.getElementsByClassName('sign-in')[0];
    // this piece of the cod is to get sign up form
    getSignupForm.addEventListener('click' , async (e) => {
        e.preventDefault();
        let href = e.target.getAttribute('href');
        let signUpForm = await fetch(href , {method: 'GET'}).then( result => {
            return result.text();
        }).catch(err => {
            console.log('page not found')
        })
        localRoot.innerHTML = signUpForm ;

        // hung handler on sign up form
        this.root.getElementsByClassName('sign-up')[0].addEventListener('submit' , (e) => {signUpFormHandler(e)})
        
    });
    // validator vill be moved on the individual class or something like function , i dunno
    let validator = (value , type) => {
        let errorLog = {};
        let specificValidator;
        // add some check function for common validation cases
        let commonValidatorsList = {
            trimHtmlTags : (value) => { 
                let oldValue = value;
                let newValue = value.replace( /<.*?>/g ,'');
                (oldValue !== newValue) ? errorLog.error = "has invalid characters" : '';
            },
            emptySpace : (value) => {
                let oldValue = value;
                let newValue = value.replace( /\s/g , '');
                (oldValue !== newValue) ? errorLog.error = "has empty space" : ''
            }
        }
        // in specific cases use switch case construction
        switch (type) {
            case 'login':
            case 'name' :
            case 'password':
                specificValidator = {
                    ...commonValidatorsList,
                    length : (value) => {
                        ( value.length === 0  )  ? errorLog.error = "can not be empty"
                        : ( value.length < 6  )  ? errorLog.error = "too short" 
                        : ( value.length > 20 )  ? errorLog.error = "too long" : '';
                    },
                    trimInvalidCharacters : (value) => { 
                        let oldValue = value;
                        let newValue = value.replace( /\W/g , '');
                        (oldValue !== newValue) ? errorLog.error = "has invalid characters" : '';
                    },
                };
                break;
            case 'email':
                specificValidator = {
                    ...commonValidatorsList,
                    hasAmpersand : (value) => {
                        let regex = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
                        ( !regex.test(value) ) ? errorLog.error = 'is invalid' : '';
                    }
                };
        }

        
        
        for (const key in specificValidator) {
            specificValidator[key](value);
            if( errorLog.error ){  
                return errorLog 
            }
            
        }
        return value;
    };
    // only sign up handler
    let signUpFormHandler = async (e) => {
        e.preventDefault();
        let errorwrap = this.root.getElementsByClassName('error-message')[0];
        let thisForm  = this.root.getElementsByClassName('sign-up')[0]; 
        // get data from input fields
        let formData  = new FormData( e.target );
        // validate data from signUp fields
        let login            = validator(formData.get('login') , 'login');
        let name             = validator(formData.get('name')  , 'name' );
        let email            = validator(formData.get('email') , 'email');
        let password         = validator(formData.get('password') , 'password');
        let confirmPassword  = validator(formData.get('confirmPassword') , 'password');
        

        // first condition checks all of form's data must be string except of the checkbox
        if( typeof login            === 'string' && 
            typeof email            === 'string' &&
            typeof name             === 'string' &&
            typeof password         === 'string' &&
            typeof confirmPassword  === 'string' &&
            password === confirmPassword
        ){
            // send form data to the server 
            await fetch( e.target.action , {
                method: 'POST',
                body : new URLSearchParams(new FormData(e.target))
            })
            .then( result => {
            // even the user was not be registered the script gets json file from the server
                return result.json();
            })
            .then( result => {
                // in any case the form will be reset 
                thisForm.reset();
                // check the result , has the user successfull registration
                // server sends true when everything is ok 
                if(result.isRegistered){
                    errorwrap.innerHTML = result.message;
                    setTimeout( () => {
                        registrationButton.click();
                    }, 1000)
                }else{
                    errorwrap.innerHTML = result.message
                }
            })
            .catch( err => {
                console.log('Server not found')
            })
        // validator sends obj when data have not passed validation
        // the sctipt bellow procedures errors
        }else if(typeof login === "object"){
            errorwrap.innerHTML = 'Login ' + login.error;
        }else if(typeof name === "object"){
            errorwrap.innerHTML = 'Name ' + name.error;
        }else if(typeof email === "object"){
            errorwrap.innerHTML = 'Email ' + email.error;
        }else if(typeof password === "object"){
            errorwrap.innerHTML = 'Password ' + password.error;
        }else if(typeof confirmPassword === "object" || password !== confirmPassword){
            errorwrap.innerHTML = 'Passwords should be same';

        }
        
    }

    // only signing in 
    signInHandler.addEventListener('submit' , async (e) => {
        e.preventDefault();
        let thisForm = this.root.getElementsByClassName('sign-in')[0];
        let errorwrap = this.root.getElementsByClassName('error-message')[0];
        let formData  = new FormData( e.target );
        let login     = validator(formData.get('login') , 'login');
        let password  = validator(formData.get('password') , 'password');
        
        
        if(typeof login === 'string' & typeof password === 'string'){
            // clear up errorWrap
            errorwrap.innerHTML = '';

            await fetch(e.target.action , {
                method:'POST',
                body : new URLSearchParams(new FormData(e.target))
            })
            .then(result => {
                thisForm.reset();
                return result.json();
            })
            .then( body => {
                // i will add some code to show on the page the user have been registered
                // for instance favorite mixes will be highlighted and name shown up somewhere;
                let data = body;
                let isLogIn  = data.exist;

                //check the user has been logged in successfully
                if(isLogIn){
                    let response = data.response[0];
                    let login = response.login;
                    let name    = response.name;
                    let favoriteRecipe = response.favoriteRecipe;

                    // save user's data
                    localStorage.setItem("name" , name);
                    localStorage.setItem("login" , login);
                    localStorage.setItem("favoriteRecipe" , favoriteRecipe);
                    // in the future there will be kind of the modal window 
                    errorwrap.innerHTML = 'user has been logged successfully';
                    setTimeout( () => {
                        let directToHome = this.root.getElementsByClassName('menu-main-link')[0];
                        let userName = localStorage.getItem('name');
                        directToHome.click();
                        _changeDOM.changeRegistrationButton(userName , '/auth/personalCabinet');
                    } , 100)
                }else{
                    let error = data.error;
                    errorwrap.innerHTML = error;
                }
            })
            .catch( err => {
                console.log("some error after submiting")
                throw err
                
            })
        }else if (typeof login === 'object'){
            errorwrap.innerHTML = "login " + login.error;
        }else if (typeof password === 'object'){
            errorwrap.innerHTML = "password " + password.error;
        }


    })
}

export {hangFormHandlerOn}