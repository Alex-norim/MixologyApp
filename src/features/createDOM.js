// images
import likeImage from "../public/svg/like.svg";
import hookahImage from "../public/svg/hookah.svg";

let color = '#ffffff';
let defColor = '#938f8f'
export default class CreateDom {
    constructor(root){
        this._root = root;
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
            let _thisID = e.target.getAttribute('data-id') || e.target.parentNode.getAttribute('data-id');
            let target = (  e.target.classList.contains('recipeWrap')  ) ? 
                            e.target : (e.target.classList.contains('recipeRating') || e.target.classList.contains('likePicture')) ? 
                            e.target.parentNode : e.target.parentNode.parentNode;

            let addToFavoriteList = (id) => {
                fetch("/auth/putlike" ,{
                    method : "PUT",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify({
                        id : _thisID,
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
                fetch("/auth/putlike" , {
                    method : "DELETE",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify({
                        id : _thisID,
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
                        svg.setAttribute('fill' , defColor);
                        ratingText.textContent = response;
                        ratingText.setAttribute("style" , "color:" + defColor);
                    }
                })
                .catch( err => {
                    throw err
                })
            }
            (async () => {
                await fetch("/auth/putlike" , {
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
            })();

        }
        // gets array to render the list as required and array of best recipes as optional 
        let renderList = (array , best = false ) => {
            for (const iterator of array) {
                let recipe = iterator.recipe;
                let rating = iterator.rating;
                let id     = iterator.id;
                let isMatch = best ? best.includes(id) : best ;
                
                // childs of li 
                let recipeText = document.createElement('span')
                    recipeText.classList.add('recipeText');
                // if the list has less than two elements
                (array.length <=1)? recipeText.innerHTML = recipe : recipeText.innerHTML = counter+'. ' + recipe ;
    
                let ratingTextNode  = document.createElement('span');
                    ratingTextNode.classList.add('recipeRating');
                    ratingTextNode.innerHTML = rating;
    
                let wrapper = document.createElement('div')
                    wrapper.classList.add('recipeWrap');
                    wrapper.addEventListener('click' , likeHandler)
                    // put id like button as attribute
                    wrapper.setAttribute('data-id' , id);
                    // add a heart picture
                    wrapper.innerHTML = likeImage;
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
    logotype(){
        let logoText = `<span class="logo-name">Mixology</span>`;
        let logo = document.createElement('div');
            logo.classList.add('logotype-wrapper');
            logo.innerHTML = hookahImage + logoText;
        
        return logo;
    }
    mainMenu(){
        let links =  {
            "home"     : "/home" ,
            "mixology" : "/mixology",
            "brands"   : "/tabaco",
            "Sign in"  : "/registration",
        }
        let ul = document.createElement('ul');
            ul.classList.add('menu-main');
        for (const key in links) {
            let a = document.createElement('a');
                a.classList.add(`menu-main-link` , `${links[key].slice(1)}` );
                a.innerHTML = key ;
                a.setAttribute('href' , links[key]);
            ul.appendChild(a);
        }
        let smallScreenBtn = document.createElement('div');
            smallScreenBtn.classList.add('smallScreenButton');
            smallScreenBtn.innerHTML = '<div class="line"></div><div class="line"></div><div class="line"></div>'
        let menu = document.createElement('nav');
            menu.classList.add('mainMenuWrap');
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
        let footerText = document.createElement('p');
            footerText.classList.add('designed_by');
            footerText.innerHTML = "designed by Alexej Malekov";
            
        footer.append(
            this.logotype(),
            footerText
        )
    }
}