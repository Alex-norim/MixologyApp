
// import protoClass
import ChangeDom from "./changeExistingElement";
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
        this.inputValidator = Validator ;
        this.alterDOM = new ChangeDom(root);
        this.formErrorHandler = (event)=>{
            let errorMessage = this._root.getElementsByClassName('error-message')[0];
            let target = event.target;
            let value  = target.value; 
            let inputType = target.attributes.type.value.toString();
            let isValidData = this.inputValidator(value , inputType );
            
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
        this.registrationOfUser = (event , userData ) => {
            event.preventDefault();
            let form = event.currentTarget;
            let errorMessageNest = form.querySelector('.error-message');
            
            let isValid = () => {
                let response;
                for (const key in userData) {
                    let iterator = userData[key];
                    typeof iterator === 'object' || typeof iterator === 'undefined' ? 
                    response = false : response = true ;
                }
                return response;
            };
            let comparePaswords = userData.password === userData.confirmPassword ;
            
            isValid() && comparePaswords ? 
                fetch("/registration/signup" , {
                    method : 'POST' ,
                    headers : {
                        'content-type' : 'application/json'
                    } ,
                    body : JSON.stringify(userData)
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
                :
                // some code will be added 
                ''
        }
    }
    recipeList(parent , arrayListOfRecipe){
        let _root = parent;
            _root.classList.add('recipe-list');
        
        let likeHandler = (e) => {
            // send those two
            let userName = localStorage.getItem('name');
            let userLogin = localStorage.getItem('login')
            if(!userName){
                return false;
            }
            let _thisID = e.currentTarget.dataset.id;
            let target = e.currentTarget;

            let addToFavoriteList = (id) => {
                console.log("add")
                fetch("/auth/putlike" ,{
                    method : "PUT",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify({
                        id : id ,
                        login : localStorage.getItem('login')
                    })
                })
                .then( result => {
                    return result.json();

                })
                .then( result => {
                    let response = result.response;
                    let svg = target.querySelector('.svgpath');
                    let ratingText = target.querySelector('.recipeRating');
                    if(response){
                        svg.setAttribute('fill' , color);
                        ratingText.textContent = response;
                        ratingText.setAttribute('style' , "color:" + color)
                    }
                })
                .catch( err => {
                    throw err
                })
            }
            let removeFromFavoriteList = (id) => {
                console.log("remove")
                fetch("/auth/putlike" , {
                    method : "DELETE",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify({
                        id : id ,
                        login : localStorage.getItem('login')
                    })
                })
                .then( result => {
                    return result.json();
                })
                .then( result => {
                    console.log(result)
                    let response = result.response;
                    let svg = target.querySelector('.svgpath');
                    let ratingText = target.querySelector('.recipeRating');
                    if(response){
                        svg.setAttribute('fill' , defColor);
                        ratingText.textContent = response;
                        ratingText.setAttribute("style" , "color:" + defColor);
                    }
                })
                .catch( err => {
                    throw err
                })
            }
            
            fetch("/auth/putlike" , {
                    method : "POST" ,
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id : _thisID,
                        login : userLogin
                    })
                })
                .then( result => {
                    return result.json();
                })
                .then( result => {
                    let hasIt = result.res;
                    if ( hasIt === true){
                        // it deletes current id
                        removeFromFavoriteList(_thisID);
                    }else if( hasIt === false){
                        // it adds 
                        addToFavoriteList(_thisID);
                    }
                })
                .catch( err => {
                    throw err;
                })
            

        }
        // it gets array to render the list as required and array of best recipes as optional 
        let renderList = (array , best = false ) => {
            for (const iterator of array) {
                let recipe = iterator.recipe;
                let rating = iterator.rating !== 0 ? iterator.rating : '0' ;
                let id     = iterator.id;
                let isMatch = best ? best.includes(id) : best ;
                
                // childs of li 
                let recipeText = document.createElement('span')
                    recipeText.classList.add('recipeText');
                // if the list has less than two elements
                (array.length <=1)? recipeText.innerHTML = recipe : recipeText.innerHTML = counter+'. ' + recipe ;
                //child of li
                let ratingTextNode  = this.newDom('span' ,'recipeRating' , false , rating);
                //child of li
                let wrapper = this.newDom("div" , 'recipeWrap' , { 'data-id' : id } , likeImage)
                    wrapper.addEventListener('click' , likeHandler)
                    wrapper.prepend(ratingTextNode);

                if(isMatch){
                    let likeBtn = wrapper.querySelector('.svgpath');
                        likeBtn.setAttribute('fill' , color);
        
                    ratingTextNode.setAttribute('style' , 'color:' + color )
                    
                }else{
                    let likeBtn = wrapper.querySelector('.svgpath');
                        likeBtn.setAttribute('fill' , defColor);
                    ratingTextNode.setAttribute('style' , 'color:' + defColor )
                }
                // main element
                let li = document.createElement('li');
                    li.classList.add('recipe-list-item');
                    li.append(recipeText , wrapper);
                counter++;
                _root.append(li)
                
            };
        }
        let counter = 1;
        if(typeof arrayListOfRecipe[0] === 'string'){
            _root.textContent = 'Server not found'
        }else if(arrayListOfRecipe === false){
            _root.textContent = 'Empty list'
        }else{
            fetch("/auth/getBestRecipes" , {
                method: "POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    login : localStorage.getItem('login')
                })
            })
            .then(result => {
                return result.json();
            })
            .then( result => {
                if (result.res !== false ) {
                    let favoriteList = result.res.map( elem => {
                        return elem.id
                    });
                    renderList(arrayListOfRecipe , favoriteList)
                }else{
                    renderList(arrayListOfRecipe)
                }
            })
            .catch(err => {
                throw err;
            })
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
            currentFieldData[name] = this.inputValidator(value , targetType );
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
            let isvalid = () => {
                let response ;
                for (const key in currentFieldData) {
                    const element = currentFieldData[key];
                    typeof element === 'object' || typeof element === 'undefined' ?
                    response = false : response = true;
                }
                return response;
            }
            isvalid() ? 
                fetch( "/auth/signin" , {
                    method:'POST',
                    headers : {
                        "content-type" : 'application/json'
                    },
                    body : JSON.stringify( currentFieldData) 
                })
                .then(result => {
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
    };
    signUpHandler = (event , fieldOrder = 1 , userData = {}) => {
        const passedData = userData;
        const currentFieldData = {};
         // field order can't be bigger than fieds num
        fieldOrder > fieldsLength ? fieldOrder = 1 : '' ;
        const fields = {
            // field : ['input name' , 'input type' , 'placeholder']
            1 : {
                login : ["login" , "text" , "Come up with login"] ,
                name  : ["name" , "text"  , "Come up with name"] ,
                email : ["email" , "email" , "Come up with e-mail"]
            } ,
            2 : {
                password : ["password" , "password" , "Come up with password"] ,
                confirmPassword : ["confirmPassword" , "password" ,  "Enter password again" ] ,
            } ,
            
        };

        let fieldsLength = Object.keys(fields).length; 
        let lastStep     = fieldOrder === fieldsLength ;
        let buttonName = fieldOrder < fieldsLength ? "Next field" : "Last step";
        let titleName = lastStep ? "Last step" : "Fill out fields";

        // foo
        let localInputHandler = (event) => {

            let target = event.target;
            let value  = target.value;
            let targetType = event.target.attributes.type.nodeValue;
            let name   = target.name;
            currentFieldData[name] = this.inputValidator(value , targetType );
        }
        //
        let form = event.currentTarget.parentNode;
            form.innerHTML = '';
            form.action = "/registration/signup";
        let title = this.newDom('h3' , 'deftitle' , false , titleName );
        let errorMessageNest = this.newDom('p' , 'error-message');
        
        let renderfields = ( root , object ) => {
            
            for (const key in object) {
                let array = object[key] ;

                let name = array[0];
                let type = array[1];
                let placeholder = array[2];
                let id   = array[0]

                let field = this.newDom('input' , false , {
                    class : "form-text form-element" ,
                    type        : type,
                    name        : name,
                    id          : id, 
                    placeholder : placeholder,
                }); 
                field.addEventListener('keyup' , this.formErrorHandler);
                field.addEventListener('keyup' , localInputHandler);
                root.appendChild(field);
            }
        }
        // dom manipulation
        form.append(title)
        // render fields of the form
        renderfields( form , fields[fieldOrder] );
        // button
        let button ;
        if(lastStep){
            button = this.newDom('input' , false , {
                class : 'form-button' ,
                type : "submit",
                value : "Sign up"
            } , buttonName );
            form.addEventListener('submit' , (e) => {
                this.registrationOfUser(e, {...passedData ,...currentFieldData});
            });
        } else{
            button = this.newDom('button' , false , {
                class : 'form-button'
            } , buttonName );
            button.addEventListener('click' , (e) => {
                this.signUpHandler(e , fieldOrder + 1 ,  {...passedData ,...currentFieldData} ) 
            });
        } 
        form.append(errorMessageNest , button);
        
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
            let newRecipe = this.inputValidator( formData.get('newrecipe') , 'name');
            let category  = this.inputValidator( formData.get('flavor')    , 'name');
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
            header.append(
                this.logotype() ,
                this.mainMenu()
            )
    }
    footer(){
        let footer = this._root.querySelector('.footer')
        let authorText = this.newDom('p', 'designed_by' , false, "designed by Alexej Malekov");
            
        footer.append(
            this.logotype(),
            authorText
        )
    }

}