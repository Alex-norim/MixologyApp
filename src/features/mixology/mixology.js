import { Model} from "./model.js";
import { View } from "./view.js";


export const Mixology = {
    init : (_root) => {
        const model = Model;
        const view  = View;
        const root = _root;
        // local dom elements
        const mixRoot = root.getElementsByClassName('mixologyID')[0];
        const mixMenu = mixRoot.querySelector('.mix-menu');
        const recipeList = mixRoot.querySelector('.recipe-list');
        // handlers
        const drawList = view.drawRecipeList;
        const drawTopRecipes = model.getTenRecipes;
        const menuItemHandler = model.showSpecificList;
        const initMixologyMenu = model.initMenu;

        // menu
        const getChildSum = Model.getWidthsum;
        const bindSlider = Model.bindSliderMenu;
        // user 
        const userStatus = Model.getuserStatus();

        initMixologyMenu({
            element : mixMenu , 
            childHandler : menuItemHandler,
            calculateWidth : getChildSum,
            drawArticles : drawList,
            makeSlider : bindSlider,
            articleNest : recipeList
        })
        // drawTopRecipes.then( result => {
        //     const topTen = result.list;
        //     console.log(result)
        //     userStatus.then( result=> {
        //         const isUserLogged = result.res;
        //         if(isUserLogged){
        //             Model.getBestRecipes().then( result => {
        //                 let best = result.res;
        //                 recipeList.innerHTML = '';
        //                 const listElements = getList( topTen , best , likeHandler );
        //                 listElements.forEach( item => {
        //                     recipeList.append(item);
        //                 })
        //             });
        //         }else{
        //             recipeList.innerHTML = '';
        //             const listElements = drawList();
        //             listElements.forEach( item => {
        //                 recipeList.append(item);
        //             })
        //         };
        //     })
        // })
    }
}   