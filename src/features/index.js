import setCookie from "./Cookie.mjs";

// images
import likeImage from "../public/svg/like.svg";

class App{
    constructor(initElement){
        this.root = initElement; 
        this._setCookie = new setCookie();
        this.pendingAnimation = '<div class="pendingWrapper"><div class="pendindAnimation"></div></div>';
    
        this.validator = (value , type) => {
            let errorLog = {};
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
            let specificValidator;

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
    }
    // methods
    setUserDataInSessionStorage(obj){
        for (const key in obj) {
            sessionStorage.setItem(key , obj[key])
        }
    }
    getUserDataInSessionStorage(key){
        return sessionStorage.getItem(key)
    }   
    hangHundlerOnMixologyMenu(){
        // getting single item
        let parent                  = this.root.getElementsByClassName('mixologyID')[0] ;
        let title                   = parent.getElementsByClassName('listTitleId')[0];
        let listRoot                = parent.getElementsByClassName('recipeListId')[0];

        // getting multiple items
        let mixologyMenuButtons     = parent.getElementsByClassName('menu-main-link') ;

        // handlers
        let getRecipe = async (event) => {
            event.preventDefault();
            let request = event.target.getAttribute('href');
            //animation of waiting
            listRoot.innerHTML = this.pendingAnimation;
            // getting from server
            let data  = await fetch( request , {method : 'GET'}).then( result => {
                listRoot.innerHTML = '';
                return result.json()
            }).catch(err=>{
                throw err;
            });
            // title 
            title.innerHTML = "Top 10 " + data.category + " recipes";
            // make the list
            let makeList = (root , array) => {
                let counter = 1;
                for (const iterator of array) {
                    let flavorRecipe = iterator.recipe;
                    let flavorRating = iterator.rating;
                    // childs of li 
                    let recipeText = document.createElement('span')
                        recipeText.classList.add('recipeText');
                    // if the list has more than one element
                    (array.length <=1)? recipeText.innerHTML = flavorRecipe : recipeText.innerHTML = counter+'. ' + flavorRecipe;

                    let rating  = document.createElement('span');
                        rating.classList.add('recipeRating');
                        rating.innerHTML = flavorRating;

                    let wrapper = document.createElement('div')
                        wrapper.classList.add('recipeWrap');
                        // add like picture
                        wrapper.innerHTML = likeImage;
                        wrapper.prepend(rating);
                    // main element
                    let li = document.createElement('li');
                        li.classList.add('recipe-list-item');
                        li.append(recipeText , wrapper);
                    root.append(li)
                    counter++;
                };
            };
            let makeErrorAlarm = (root , element) => {
                let li = document.createElement('li');
                    li.classList.add('recipe-list-item');
                    li.innerHTML = element;
                root.append(li);
            };

            // create certain type of the list
            
            if(data.database){
                let recipeList = data.list;
                makeList(listRoot , recipeList);
            }else{
                // if database not found
                let errorMessage = data.list[0];
                makeErrorAlarm(listRoot , errorMessage)
            }   
            
        };

        
        for (const item of mixologyMenuButtons) {
            item.addEventListener('click' , getRecipe )
        }
        return false;
    };
    // tabaco
    hangHundlerOnTabacoMenu (){
        // getting single item
        let parent              = this.root.getElementsByClassName('tabacoID')[0];
        let contentPlace        = parent.getElementsByClassName('tabacoHistoryID')[0];
        // getting multiply items
        let tabacoMenuItem      = parent.getElementsByClassName('menu-main-link');

        // getting of data
        let getData = async (event) => {
            let URL = event.target.getAttribute('data-link');
            //animation of waiting
            contentPlace.innerHTML = this.pendingAnimation;
            let data = await fetch(URL , {method: 'GET'}).then( result => {
                return result.json();
            }).catch(err => {
                console.log('errrrrrr')
            });
            contentPlace.innerHTML = '';
            contentPlace.innerHTML = data.res;
        }

        for (const item of tabacoMenuItem) {
            item.addEventListener('click' , getData)
        }

    }
    
    hangFormHandlerOn(){
        let localRoot = this.root.getElementsByClassName('body-content')[0];
        let getSignupForm = this.root.getElementsByClassName('getRegistrationForm')[0];
        let signInHandler = this.root.getElementsByClassName('sign-in')[0];

        // only sign up handler
        let signUpFormHandler = async (e) => {
            e.preventDefault();
            let errorwrap = this.root.getElementsByClassName('error-message')[0];
            let thisForm  = this.root.getElementsByClassName('sign-up')[0]; 
            let formData  = new FormData( e.target );
            // form data
            let login            = this.validator(formData.get('login') , 'login');
            let name             = this.validator(formData.get('name')  , 'name' );
            let email            = this.validator(formData.get('email') , 'email');
            let password         = this.validator(formData.get('password') , 'password');
            let confirmPassword  = this.validator(formData.get('confirmPassword') , 'password');
            

            // first condition checks all of form's data must be string except of the checkbox
            if( typeof login            === 'string' && 
                typeof email            === 'string' &&
                typeof name             === 'string' &&
                typeof password         === 'string' &&
                typeof confirmPassword  === 'string' &&
                password === confirmPassword
            ){
                await fetch( e.target.action , {
                    method: 'POST',
                    body : new URLSearchParams(new FormData(e.target))
                }).then( result => {
                    return result.json();
                }).then( result => {
                    thisForm.reset();
                    if(result.isRegistered){
                        errorwrap.innerHTML = result.message
                    }else{
                        errorwrap.innerHTML = result.message
                    }
                }).catch( err => {
                    console.log('Server not found')
                })
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

        // handler of the button what gets sign up form
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

        // only signing in 
        signInHandler.addEventListener('submit' , async (e) => {
            e.preventDefault();
            let thisForm = this.root.getElementsByClassName('sign-in')[0];
            let errorwrap = this.root.getElementsByClassName('error-message')[0];
            let formData  = new FormData( e.target );
            let login     = this.validator(formData.get('login') , 'login');
            let password  = this.validator(formData.get('password') , 'password');
            
            
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
                        let name = response.name;
                        this.setUserDataInSessionStorage({
                            userName : name
                        })
                        // i will add some code in the futere
                        errorwrap.innerHTML = 'user has been logged successfully'
                        setTimeout( () => {
                            let directToHome = this.root.getElementsByClassName('menu-main-link')[0];
                            directToHome.click();
                        } , 2000)
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
    hangHundlerOnHomeMenuItem(){
        let UserNameInSessionStorage = this.getUserDataInSessionStorage('userName');
        console.log(UserNameInSessionStorage)
        let title = this.root.getElementsByClassName('main-title')[0];

        (UserNameInSessionStorage) ? title.innerHTML = "Welcome " + UserNameInSessionStorage[0].toUpperCase() + UserNameInSessionStorage.slice(1) : ''
    }
    hangHundlerOnMineMenu(){
        let mineMenuItems = document.getElementById('main-menu').getElementsByClassName('menu-main-link');
        
        let getpage = async (event) => {
            event.preventDefault();
            let bodyContent = document.getElementById('body-content');
            let request = event.target.getAttribute('href');
            //animation of waiting
            bodyContent.innerHTML = this.pendingAnimation;
            let data = await fetch(request).then( result => {
                let text = result.text();
                return text;
            } ).catch( err => {
                throw err;
            })

            bodyContent.innerHTML = data;
            switch (request) {
                case '/home' :
                    this.hangHundlerOnHomeMenuItem();
                    break;
                case '/mixology':
                    this.hangHundlerOnMixologyMenu();
                    break;
                case '/tabaco':
                    this.hangHundlerOnTabacoMenu();
                    break;
                case '/registration':
                    this.hangFormHandlerOn();
                    break;
                default:
                    break;
            }
            return false;
        }

        for (const item of mineMenuItems) {
            item.addEventListener('click' , getpage )
        }
        return false;
    }
    init(){
        this.hangHundlerOnMineMenu();
        this._setCookie.createWindow();
        
    }
}

let app = new App(document.getElementById('root'));
app.init();

