import {Animation} from '../setUp';
const init = {
    method : 'GET' ,
    headers : {
        "Content-Type" : "application/json"
    }
}
const Model = {
    likeHandler : (e) => {
        const defColor = "rgb(182 179 179);";
        const color = '#ffffff';
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
                console.log(ratingText)
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
                removeFromFavoriteList( _thisID );
            }else if( hasIt === false){
                // it adds 
                addToFavoriteList( _thisID );
            }
        })
        .catch( err => {
            throw err;
        })
    }, 
    bindHandler : (objectDomElements , eventType , handler) => {
        let items = Object.values(objectDomElements);
        for (const menuItem of items ) {
            menuItem.addEventListener(eventType , handler)   
        }
    },
    showSpecificList : (e , drawList , root, likeHandler) => {
        const target = e.currentTarget;
        const href   = target.attributes.href.value;
        const circle = Animation.waiting;
        const title  = root.querySelector('h2.recipe-title');
        const listroot = root.querySelector('.recipe-list');
            listroot.innerHTML = circle;
        fetch(href , init)
        .then( result => result.json())
        .then( result => {
            let array = result.list;
            let category = result.category.slice(0,1).toUpperCase() + result.category.slice(1);
            
            let listElements = drawList(array , false , likeHandler);
            title.textContent = category + ' recipes';
            listroot.innerHTML = '';
            listElements.forEach(item => {
                listroot.append(item)
            })
        })
    },
    // next 
    getBestRecipes : async (url) => {
        return await fetch( url , init)
            .then( result => result.json())
            .catch( err => {throw err})
    },
    // next 
    getTenRecipes : fetch("/mixology/topten" , init)
    .then( result => {
        return result.json();
    })
    .catch( err => {
        throw err;
    }),
    // next

}

export {Model};