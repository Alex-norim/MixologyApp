
// import protoClass

import Protos from "./prototype";
// images
import likeImage from "../public/svg/like.svg";
import hookahImage from "../public/svg/hookah.svg";
import Validator from "../features/validator.js";


let color = '#ffffff';
let defColor = '#938f8f'
export default class CreateDom extends Protos {
    constructor(root){
        super(root)
        this._root = root;
        this.formErrorHandler = (event)=>{
            let errorMessage = this._root.getElementsByClassName('error-message')[0];
            let target = event.target;
            let value  = target.value; 
            let inputType = target.attributes.type.value.toString();
            const initValidator = new Validator(value , inputType);
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
        }
    }
    confirmation(text , acceptFunc , rejectFunc){
        let acceptance = document.createElement('button');
            acceptance.classList.add('button');
            acceptance.textContent = 'accept';
            // hung function
            acceptance.addEventListener('click' , acceptFunc);
        let rejection = document.createElement('button');
            rejection.classList.add('button');
            rejection.textContent = 'reject';
            // hung function
            rejection.addEventListener('click' , rejectFunc);
        let title = document.createElement('span');
            title.classList.add('modalWindowTitle');
            title.textContent = text ;
        let modalWindow = document.createElement('div');
            modalWindow.classList.add('modalWindow');
            modalWindow.append(title , acceptance ,rejection);
        let modalWindowWrap = document.createElement('div');
            modalWindowWrap.classList.add('modalWindowWrap');
            modalWindowWrap.append(modalWindow);
        return modalWindowWrap;
    }
    getSighInForm(nest , getpageFunc){
        let root = nest;
        const currentFieldData = {};
        let localDataHandler = (event) => {
            let target = event.target;
            let value  = target.value;
            let targetType = event.target.attributes.type.nodeValue;
            let name   = target.name;
            const initValidator = new Validator(value , targetType);
            const isValidData = initValidator.getErrors()[0];
    
            if( typeof isValidData === 'object'){
                currentFieldData[name] = isValidData ;
            }else{
                currentFieldData[name] = value ;
            }
            
        }
        let textInput = this.newDom('input' , ['form-text' , 'form-element'] , {
            type:"text",
            name:"login",
            placeholder : "enter login",
            id : "login"
        });
            textInput.addEventListener('keyup' , this.formErrorHandler);
            textInput.addEventListener('keyup' , localDataHandler)
        let passwordInput = this.newDom('input' , ['form-text' , 'form-element'] , {
            type : "password", 
            name:"password", 
            id:"password", 
            placeholder:"enter password"
        });
            passwordInput.addEventListener('keyup' , this.formErrorHandler);
            passwordInput.addEventListener('keyup' , localDataHandler);
        let errorNest = this.newDom('p' , "error-message");
        let submitBtn = this.newDom('input' , ["form-button" , 'form-element'] , {
            type:"submit", 
            value:"Log in"
        });
        
        let title = this.newDom('h3' , 'deftitle' , false , "Sign in");
        let form = this.newDom('form' , ['form','sign-in'] , {
            action : "/auth/signin" ,
            method : "POST"
        });
        let closeFormButton = this.newDom('div' , 'closeFormButton' , false , "<div class='line'></div><div class='line'></div>")
            closeFormButton.addEventListener('click' , function(event){
                let target = event.currentTarget.parentNode.parentNode;
                    target.remove();
                let registButton = this.getElementsByClassName('registration')[0];
                    registButton.addEventListener('click' , getpageFunc)
            }.bind(this._root));

        // this form handler ----------->
        form.addEventListener('submit' , (e ) => {
            e.preventDefault();
            let form    = e.currentTarget;
            let closeFormButton = form.querySelector('.closeFormButton');
            let errorwrap = form.getElementsByClassName('error-message')[0];
            console.log('sign in')
            let isvalid = () => {
                let response;
                for (const key in currentFieldData) {
                    const element = currentFieldData[key];
                    typeof element === 'object' || typeof element === 'undefined' ? 
                    response = false : response = true ;
                }
                return response;
            }
            console.log(isvalid() , currentFieldData)
            isvalid() ? 
                fetch( "/auth/signin" , {
                    method:'POST',
                    headers : {
                        "content-type" : 'application/json'
                    },
                    body : JSON.stringify( currentFieldData) 
                })
                .then(result => {
                    console.log(currentFieldData)
                    console.log("data are valid")
                    form.reset();
                    closeFormButton.click();
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
                        // in the future there will be kind of the modal window 
                        errorwrap.innerHTML = 'user has been logged successfully';
                        setTimeout( () => {
                            let userName = localStorage.getItem('name');
                            this.alterDOM.changeRegistrationButton(userName , '/auth/personalCabinet');
                            
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
                // else
                : '' 
            ;
        })
        let getSignUpFormbtn = this.newDom('a' , 'getRegistrationForm' , {
            href : "#" ,
        } , "I don't have account");
            getSignUpFormbtn.addEventListener( "click" , this.signUpHandler );
            form.append(title , textInput , passwordInput , errorNest , submitBtn , getSignUpFormbtn , closeFormButton);
        let formWrap = this.newDom('div' , ["defbox" , "signInWrap"]);
            formWrap.append(form);
        root.append(formWrap);
    }
    suggestNewRecipe(parent){
        
        let root = parent;
        let title = this.newDom('h2' , 'deftitle' , false , "Recommend new recipe");
        let formText = this.newDom('input' , ['form-text','form-element'] , {
            type : 'text',
            name : 'newrecipe',
            placeholder : "enter your recipe...",
            autocomplete : 'off'
        });
            formText.addEventListener('keyup' , this.formErrorHandler )
        let formbutton = this.newDom('input' , ['form-button' , 'form-element'] , {
            type : 'submit' ,
            value : 'Send'
        })
        let errorMessage = this.newDom('p' , ["error-message" , "form-element"] );
        // form
        let form = this.newDom('form' , ['form' , 'recommendation'] , {
            method : "POST" ,
            action : "/auth/recomendnewrecipe"
        })  
        
        form.addEventListener('submit' , (e) => {
            e.preventDefault();
            let formData = new FormData (e.target);
            let newRecipe = new Validator( formData.get('newrecipe') , 'name');
            let category  = new Validator( formData.get('flavor')    , 'name');
            let strength  = formData.get('strength');
            let errorMessageNest = this._root.getElementsByClassName("error-message")[0]; 
            // --->
            typeof newRecipe !== 'object' ?
                fetch( e.target.action , {
                    method : "POST",
                    body : new URLSearchParams(new FormData(e.target))
                })
                .then( result => {
                    return result.json();
                })
                .then( result => {
                    let isAdded = result.isAdded;
                    let response = result.res;
                    
                    isAdded ?
                        errorMessageNest.textContent = response : 
                        errorMessageNest.textContent = response ;

                    setTimeout( () => {
                        errorMessageNest.textContent = ''
                    } , 800)
                })
                .catch( err => {
                    throw err
                }) : 
                '' ;
            // <--

        });
        let mainWrap = this.newDom('div' , 'defbox');
        fetch( '/auth/getcategory' , {method: 'GET'})
            .then( result => {
                return result.json();
            })
            .then( result => {
                let arr = result.res;
                let flavorOptions = arr.reduce( (prev,curr) => {
                    let previous = prev;
                    let current;
                    if (previous === ''){
                        current = `<option selected value="${curr}">${curr}</option>`
                    }else {
                        current = `<option value="${curr}">${curr}</option>`
                    }
                    return previous + current;
                } , '');
                let selectFlavorDom = this.newDom('select' , ['form-select','form-element'] , {
                    id : 'flavor',
                    name : 'flavor'
                } , flavorOptions );
                
                let selectStrengthDom = this.newDom('select' , ['form-select' , 'form-element'] , {
                    id : 'strength' ,
                    name : 'strength'
                } , ( () => {
                    let options = '';
                    for (let i = 0; i <= 10; i++) {
                        options += `<option>${i}</option>`
                    };
                    return options;
                })() );
        
                form.append(formText , selectFlavorDom, selectStrengthDom , formbutton);
                mainWrap.append(title , form , errorMessage);
                root.append(mainWrap);
            });
            
    }
    logotype(){
        let logoText = `<span class="logo-name">Mixology</span>`;
        let logo = this.newDom('div' ,'logotype-wrapper' , false , hookahImage + logoText) 
        
        return logo;
    }
    mainMenu(){
        let ul = this.newDom('ul' ,'menu-main');
        let links =  {
            "home"     : "/home" ,
            "mixology" : "/mixology",
            "brands"   : "/tabaco",
            "Sign in"  : "/registration",
        }
        for (const key in links) {
            let innerContent = key;
            let link = links[key];
            let a = null;
            innerContent === "Sign in" ?
                a = this.newDom(
                        'a' , 
                        [`menu-main-link` , `${link.slice(1)}`] , 
                        {href : '#'},
                        innerContent
                        ) :
                a = this.newDom(
                    'a' , 
                    [`menu-main-link` , `${link.slice(1)}`] , 
                    {'href' : link },
                    innerContent
                    )
            ul.appendChild(a);
        }
        let clickHumburgerMenu = (event) => {
            // toggle funcs use this var to define time till hide items
            let timeTillHide = 400;
            let menuList = this._root.getElementsByClassName('menu-main')[0];
            let menuListItems = Object.entries (menuList.getElementsByClassName('menu-main-link'));
            let displayStatus =  menuList.style.display;
            let lines = Object.entries (this._root.getElementsByClassName('smallScreenButton')[0].getElementsByClassName('line'));
            let toggleLines = (obj , showup = false) => {
                let menuLineFrames = [
                    [{transform: 'rotate(0deg)' , marginTop: 0} , {transform: 'rotate(45deg)' , marginTop: '15px'}] ,
                    [{transform: 'rotate(0deg)' ,display: 'block' , left : 0 , width : "100%"} , {transform: "rotate(360deg)", left : "50%" , width: 0}] ,
                    [{transform: "rotate(0deg)", marginBottom: "1px"} , {transform: 'rotate(-45deg)' , marginBottom: '14px' }] 
                ];
                obj.forEach( item => {
                    let key = Number(item[0]);
                    let element = item[1];
                    element.animate( 
                        menuLineFrames[key]    
                    , {
                        delay : 0,
                        direction : showup ? "normal": "reverse",
                        duration : timeTillHide , 
                        iterations : 1 ,
                        fill : "forwards"
                    })
                })
            }
            let toggleMenuItems = (obj , showup) => {
                let menuItemsFrames = [
                    [{top : "20px" , display : 'none'} , {top : '20px' , display : 'block' }],
                    [{top : "20px" , display : 'none'} , {top : '62px' , display : 'block'} ],
                    [{top : "20px" , display : 'none'} , {top : '104px' , display : 'block'} ],
                    [{top : "20px" , display : 'none'} , {top : '146px' , display : 'block'} ]
                ];
                obj.forEach( item => {
                    let key = Number(item[0]);
                    let element = item[1];
                    
                    element.addEventListener('click' , (event) => {
                        let isMobileMenu = event.target.parentNode.getAttribute('style') || false ; 
                        let windowWidth = window.innerWidth;
                        // check if the menu is in expanded state 
                        isMobileMenu ? toggleLines(lines , false) : '';
                        if(windowWidth <= 750) { 
                            menuList.style.display = 'none';
                        }
                    })
                    
                    let anim = element.animate( 
                        menuItemsFrames[key]    
                    , {
                        delay : 0,
                        direction : showup ? "normal" : "reverse",
                        duration : timeTillHide , 
                        iterations : 1 ,
                        fill : "forwards"
                    });
                })
            }
            
            if(displayStatus === 'flex'){
                toggleLines(lines , false)
                toggleMenuItems(menuListItems , false);
                
                setTimeout( () => {
                    menuList.style.display = 'none';
                } , timeTillHide + 10 );
                
            }else{
                toggleLines(lines , true)
                toggleMenuItems(menuListItems , true)
                menuList.style.display = 'flex';
            }
            
        }
        // --------------
        let smallScreenContent = '<div class="line"></div><div class="line"></div><div class="line"></div>';
        let smallScreenBtn = this.newDom('div' ,'smallScreenButton' , false , smallScreenContent );
            smallScreenBtn.addEventListener('click' , clickHumburgerMenu)
        let menu = this.newDom('nav' ,'mainMenuWrap');
            menu.append( smallScreenBtn , ul );

        return menu;
    }
    header(){
        
        let header = this._root.querySelector('.header');
        header.innerHTML = '';

        header.append(
            this.logotype() ,
        )
    }
    footer(){
        let footer = this._root.querySelector('.footer')
        footer.innerHTML = '';
        let authorText = this.newDom('p', 'designed_by' , false, "designed by Alexej Malekov");
            
        footer.append(
            this.logotype(),
            authorText
        )
    }

}