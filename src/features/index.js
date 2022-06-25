
import ChangeDom from './changeExistingElement.js';
import {hangFormHandlerOn as formHandler} from './registration.js';

// images
import likeImage from "../public/svg/like.svg";
// style
import '../public/css/style.css';
class App{
    constructor(initElement){
        this.root = initElement; 
        this.hangFormHandlerOn = formHandler;
        this.pendingAnimation = '<div class="pendingWrapper"><div class="pendindAnimation"></div></div>';
        this._changeDom = new ChangeDom(this.root);
    }
    // methods 
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
    hangHundlerOnPersonalCab(e){

    }
    hangHundlerOnMineMenu(){
        let mainMenu = this.root.getElementsByClassName('mainMenuWrap')[0];
        let mineMenuItems = Object.values( mainMenu.getElementsByClassName('menu-main-link') );
        let smallScreenMenuButton = mainMenu.getElementsByClassName('smallScreenButton')[0];

        let getpage = async (event) => {
            event.preventDefault();
            let bodyContent = document.getElementById('body-content');
            let request = event.target.getAttribute('href');
            //animation of waiting
            bodyContent.innerHTML = this.pendingAnimation;
            let data;
            // local store
            let favoriteRec = localStorage.getItem('favoriteRecipe');
            let username = localStorage.getItem('name')
            if(request === '/auth/personalData'){
                data = await fetch(request , {
                    method: "POST",
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({ arrayOfID : favoriteRec , name : username})
                }).then( result => {
                    let text = result.text();
                    return text;
                } ).catch( err => {
                    throw err;
                })
            }else{
                data = await fetch(request , {
                }).then( result => {
                    let text = result.text();
                    return text;
                } ).catch( err => {
                    throw err;
                })
            }

            bodyContent.innerHTML = data;
            switch (request) {
                case '/home' :
                    // this.hangHundlerOnHomeMenuItem();
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
                case '/auth/personalData':
                    this.hangHundlerOnPersonalCab();
                    break;
                default:
                    break;
            }
            return false;
        }
        mineMenuItems.forEach( menuitem => {
            
            menuitem.addEventListener('click' , getpage )
        })
        // "POST" , JSON.stringify({ arrayOfID : localStorage.getItem('favoriteRecipe')})

    }
    init(){
        let isAuthorized = localStorage.getItem('name') ? true : false;
        if(isAuthorized){
            this._changeDom.changeRegistrationButton();
        }
        this.hangHundlerOnMineMenu();
    }
}

let app = new App(document.getElementById('root'));
app.init();

