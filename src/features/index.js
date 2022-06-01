import setCookie from "./Cookie.mjs";

// images
import likeImage from "../public/svg/like.svg";
class App{
    constructor(initElement){
        this.root = initElement; 
        this._setCookie = new setCookie();
        this.pendingAnimation = '<div class="pendingWrapper"><div class="pendindAnimation"></div></div>';
    }
    // mixology 
    hangHundlerOnMixologyMenu(){
        // getting single item
        let parent                  = this.root.getElementsByClassName('mixologyID')[0] ;
        let title                   = parent.getElementsByClassName('listTitleId')[0];
        let listRoot                = parent.getElementsByClassName('recipeListId')[0];
        // getting multiple items
        let mixologyMenuButtons     = parent.getElementsByClassName('menu-main-link') ;
        
        //

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
            //inner finction
            let makeList = (root , array) => {
                let counter = 1;
                for (const iterator of array) {
                    let flavorRecipe = iterator.recipe;
                    let flavorRating = iterator.rating;
                    // childs of li 
                    let recipeText = document.createElement('span')
                        recipeText.classList.add('recipeText');
                        recipeText.innerHTML = counter+'. ' + flavorRecipe;
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

            makeList(listRoot , data.list)
            // if( data.list.length > 1){
            //     //it creates a numeric list
            //     makeList(listRoot , data.list)
            // }else{
            //     // if response contains only one item
            //     // let li = document.createElement('li');
            //     //     li.classList.add('recipe-list-item');
            //     //     li.innerHTML = recipe.list[0];
            //     // list.appendChild(li);
            // }
            
            
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
                case '/mixology':
                    this.hangHundlerOnMixologyMenu();
                    break;
                case '/tabaco':
                    this.hangHundlerOnTabacoMenu();
                    break;
                default:
                    break;
            }
            return false;
        }

        for (const item of mineMenuItems) {
            item.addEventListener('click' , getpage )
        }

    }
    init(){
        this.hangHundlerOnMineMenu();
        this._setCookie.createWindow();
        
    }
}

let app = new App(document.getElementById('root'));
app.init();

