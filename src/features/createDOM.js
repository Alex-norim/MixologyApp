
// import protoClass
import Protos from "./prototype";
// images
import likeImage from "../public/svg/like.svg";
import hookahImage from "../public/svg/hookah.svg";

let color = '#ffffff';
let defColor = '#938f8f'
export default class CreateDom extends Protos {
    constructor(root){
        super(root)
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
        // it gets array to render the list as required and array of best recipes as optional 
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
    suggestOwnRecipe(){

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
            let a = this.newDom(
                'a' , 
                [`menu-main-link` , `${link.slice(1)}`] , 
                {'href' : link },
                innerContent
                );
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