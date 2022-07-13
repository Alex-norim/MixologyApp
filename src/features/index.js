
import ChangeDom from './changeExistingElement.js';
import {hangFormHandlerOn as formHandler} from './registration.js';
import CreateDom from './createDOM.js';

// style
import '../public/css/style.css';
class App{
    constructor(initElement){
        this.root = initElement; 
        this.hangFormHandlerOn = formHandler;
        this.pendingAnimation = '<div class="pendingWrapper"><div class="pendingAnimation"></div></div>';
        this._changeDom = new ChangeDom(this.root);
        this._createDOM = new CreateDom(this.root);
    }
    // methods 
    hangHandlerOnMixologyMenu(){
        // getting single item
        let parent = this.root.getElementsByClassName('mixologyID')[0] ;
        let title  = parent.getElementsByClassName('listTitleId')[0];
        let listRoot = parent.getElementsByClassName('recipeListId')[0];
        let showTopTenRecipes = async () => {
            await fetch("/mixology/topten" , {
                method : "GET",
            })
            .then( result => {
                return result.json();
            }).then( result => {
                let category = result.category;
                let recipes  = result.list;
                let hasAccsessToServer = result.database;
                this._createDOM.recipeList(listRoot , recipes)
            })
            .catch( err => {
                throw err;
            })
        }
        showTopTenRecipes();
        // getting multiple items
        let mixologyMenuButtons = Object.values(parent.getElementsByClassName('menu-main-link'));
        // handlers
        let getRecipe = async (event) => {
            event.preventDefault();
            let request = event.target.getAttribute('href');
            //animation of waiting
            listRoot.innerHTML = this.pendingAnimation;
            // getting from server
            let data = await fetch( request , {method : 'GET'})
            .then( result => {
                listRoot.innerHTML = '';
                return result.json();
            })
            .catch(err=>{
                throw err;
            });
            let category = data.category;
            let recipes  = data.list;
            let hasAccsessToServer = data.database;
            // title 
            title.innerHTML = "Top 10 " + category + " recipes";
                // if db is available;
            if(hasAccsessToServer){
                // there is creating the list of recipes
                this._createDOM.recipeList(listRoot , recipes);
            }else{
                // if database not found
                let errorMessage = data.list[0];
                let li = document.createElement('li');
                    li.classList.add('recipe-list-item');
                    li.innerHTML = errorMessage;
                listRoot.append(li);
            }   
            
        };
        mixologyMenuButtons.forEach( item => {
            item.addEventListener('click' , getRecipe );
        })
    };
    // tabaco
    hangHandlerOnTabacoMenu (){
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
    hangHandlerOnPersonalCab(e){
        let personalCab = this.root.getElementsByClassName('personalCab')[0];
        let logOutButton = personalCab.getElementsByClassName('logout')[0];

        // createList
        let TheBestRecipes = fetch ("/auth/getBestRecipes", {
            method: "POST" , 
            headers :{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                login : localStorage.getItem('login')
            })
        }).then( result => {
            return result.json();
        }).then( body => {
            this._createDOM.recipeList( this.root.getElementsByClassName("favoriteRecipeList")[0] , body.res)
        })
    
        logOutButton.addEventListener("click" , (e) => {
            let rejectionFunction = (event) => {
                let target = event.target;
                let parentNode = target.parentNode.parentNode;
                    parentNode.style.display = "none";
            };
            let acceptanceFunction = (e) => {
                let target = e.target;
                let parentNode = target.parentNode.parentNode;
                    parentNode.style.display = "none";
                localStorage.removeItem('name');
                localStorage.removeItem('login');
                localStorage.removeItem('favoriteRecipe');
                this._changeDom.changeRegistrationButton("Sign in" , "/registration");
                let toRegistrationPage = this.root.getElementsByClassName('registration')[0];
                    toRegistrationPage.click();
            }
            let modalWindow = this._createDOM.confirmation( "Are you sure?" ,acceptanceFunction , rejectionFunction);
            this.root.append(modalWindow);
        })
    }
    hangHandlerOnMineMenu(){
        // vars
        let mainMenu = this.root.getElementsByClassName('mainMenuWrap')[0];
        let mineMenuItems = Object.values( mainMenu.getElementsByClassName('menu-main-link') );
        // funcs
        let getpage = async (event) => {
            event.preventDefault();
            let bodyContent = document.getElementById('body-content');
            let HrefRequest = event.target.getAttribute('href');
            //animation of waiting
            bodyContent.innerHTML = this.pendingAnimation;
            let data;
            // local store
            let userlogin = localStorage.getItem('login');
            let username = localStorage.getItem('name');
            // some request requires data
            if(HrefRequest === '/auth/personalCabinet'){
                data = await fetch(HrefRequest , {
                    method: "POST",
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({ login : userlogin , name : username})
                }).then( result => {
                    let text = result.text();
                    return text;
                } ).catch( err => {
                    throw err;
                })
            }else{
                data = await fetch(HrefRequest , {
                }).then( result => {
                    let text = result.text();
                    return text;
                } ).catch( err => {
                    throw err;
                })
            }

            bodyContent.innerHTML = data;
            switch (HrefRequest) {
                case '/home' :
                    // this.hangHundlerOnHomeMenuItem();
                    break;
                case '/mixology':
                    this.hangHandlerOnMixologyMenu();
                    break;
                case '/tabaco':
                    this.hangHandlerOnTabacoMenu();
                    break;
                case '/registration':
                    this.hangFormHandlerOn();
                    break;
                case '/auth/personalCabinet':
                    this.hangHandlerOnPersonalCab();
                    break;
                default:
                    break;
            }
            return false;
        }
        mineMenuItems.forEach( menuitem => {
            menuitem.addEventListener('click' , getpage )
        })

    }
    init(){
        window.addEventListener('resize' , (event) => {
            let currentScreenWidth = window.innerWidth;
            if(currentScreenWidth > 750 ){
                let menuList = this.root.getElementsByClassName("mainMenuWrap")[0].getElementsByClassName('menu-main')[0];
                    menuList.removeAttribute('style');
            }

        } , true)
        let isAuthorized = localStorage.getItem('name') ? true : false;
        this._createDOM.header();
        this._createDOM.footer();
        if(isAuthorized){
            let userName = localStorage.getItem('name'); 
            this._changeDom.changeRegistrationButton(userName , '/auth/personalCabinet');
        }
        this.hangHandlerOnMineMenu();
    }
}
let app = new App(document.getElementById('root'));

app.init();
