// images
import likeImage from "../public/svg/like.svg";
export default class CreateDom {
    constructor(root){
        this._root = root;
    }
    recipeList(parent , array){
        let putLike = (e) => {
            // send those two
            let userName = localStorage.getItem('name');
            let userLogin = localStorage.getItem('login')
            if(!userName){
                return false;
            }
            let _thisID = e.target.getAttribute('data-id') || e.target.parentNode.getAttribute('data-id');
            let target = e.target.classList.contains("recipeWrap") || e.target.parentNode.classList.contains('recipeWrap');
            let addToFavoriteList = (id) => {
                fetch("/auth/putlike" ,{
                    method : "PUT",
                    headers :{

                    },
                    body : JSON.stringify({
                        id : _thisID,
                        login : localStorage.getItem('login')
                    })
                })
                .then( result => {
                    console.log(result.text())
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
                    localStorage.setItem("favoriteRecipe" , result.res)
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
                        console.log("user has it")
                        // it deletes current id
                        removeFromFavoriteList(_thisID);
                        
                    }else if( hasIt === false){
                        console.log("user has not this in own favorite list")
                        // it adds 
                        addToFavoriteList(_thisID);
                    }
                })
                .catch( err => {
                    throw err;
                })
            })();

        }
        let counter = 1;
        for (const iterator of array) {
            let recipe = iterator.recipe;
            let rating = iterator.rating;
            let id     = iterator.id;
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
                wrapper.addEventListener('click' , putLike)
                // put id like button as attribute
                wrapper.setAttribute('data-id' , id)
                // add like picture
                wrapper.innerHTML = likeImage;
                wrapper.prepend(ratingTextNode);
            // main element
            let li = document.createElement('li');
                li.classList.add('recipe-list-item');
                li.append(recipeText , wrapper);
            counter++;
            parent.append(li)
            
        };
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
}