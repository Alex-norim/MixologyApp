import {Animation} from '../setUp.js';
import { Model as ArtModel } from '../articles/model.js';
import { Model as menuModel } from '../menu/model.js';
import { getBestRecipes as GetFavorite } from '../appSettings/commonFunctions.js';
const init = {
    method : 'GET' ,
    headers : {
        "Content-Type" : "application/json"
    }
}
const Model = {
    bindHandler : (objectDomElements , eventType , handler) => {
        let items = Object.values(objectDomElements);
        for (const menuItem of items ) {
            menuItem.addEventListener(eventType , handler)   
        }
    },
    showSpecificList : (e , drawList , root) => {
        const target = e.currentTarget;
        const href   = target.querySelector('a').attributes.href.value;
        const checkUserStatus = menuModel.getUserServerStatus();
        fetch(href , init)
            .then( result => result.json())
            .then( result => {
                let array = result.list;
                let category = result.category.slice(0,1).toUpperCase() + result.category.slice(1);
                
                checkUserStatus
                    .then(result => {
                        const title  = root.parentNode.querySelector('h2.recipe-title');
                        const ListRoot = root;

                        const isLogged = result.res;
                        let listElements;
                        title.textContent = category + ' recipes';
                        isLogged ?
                            listElements = drawList(array , ListRoot , true , GetFavorite() ) :
                            listElements = drawList(array , ListRoot , false);
                    })
                

            })
    },
    // next 
    getTenRecipes : fetch("/mixology/topten" , init).then( result => {return result.json();}).catch( err => { throw err;}),
    // next
    getWidthsum : ArtModel.childWidthSum,
    bindSliderMenu : ArtModel.articleMenuSlider,
    getAdaptMenu : ArtModel.articleMenuWidth,
    getuserStatus : menuModel.getUserServerStatus,
    initMenu : ArtModel.initArticleMenu,
    checkUserStatus : menuModel.getUserServerStatus,
}

export {Model};