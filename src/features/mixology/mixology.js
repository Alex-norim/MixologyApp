import { Model} from "./model.js";
import { View } from "./view.js";


export const Mixology = {
    init : (_root) => {
        const model = Model;
        const view  = View;
        const root = _root;
        // local dom elements
        const mixRoot = root.getElementsByClassName('mixologyID')[0];
        const mixMenu = mixRoot.getElementsByClassName('menu-main-link');
        const recipeList = mixRoot.querySelector('.recipe-list');
        // handlers
        const likeHandler = model.likeHandler;
        const getList = view.drawRecipeList;
        const drawTopRecipes = model.getTenRecipes;
        const menuItemHandler = model.showSpecificList;
        // user 
        const isUserLogged = localStorage.getItem('name') || false;
        model.bindHandler(mixMenu , 'click' , (e) => {
            menuItemHandler(e , getList , mixRoot , likeHandler);
        } );
        
        // hang handler on the mix menu item
        // draw top ten recipes
        drawTopRecipes.then( result => {
            const topTen = result.list;
            if(isUserLogged){
                Model.getBestRecipes().then( result => {
                    let best = result.res;
                    recipeList.innerHTML = '';
                    const listElements = getList( topTen , best , likeHandler );
                    listElements.forEach( item => {
                        recipeList.append(item);
                    })
                });
            }else{
                recipeList.innerHTML = '';
                listElements = getList( topTen , false );
                listElements.forEach( item => {
                    recipeList.append(item);
                })
            };
        })
    }
}   