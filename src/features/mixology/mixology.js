import { Model} from "./model.js";
import { View } from "./view.js";


export const Mixology = {
    init : (e ,_root) => {
        const model = Model;
        const view  = View;
        const root = _root;
        const event = e;
        // local dom elements
        const mixRoot = root.getElementsByClassName('mixologyID')[0];
        const mixMenu = mixRoot.querySelector('.mix-menu');
        const recipeList = mixRoot.querySelector('.recipe-list');
        // handlers
        const drawList = view.drawRecipeList;
        const menuItemHandler = model.showSpecificList;
        const initMixologyMenu = model.initMenu;
        const showTopRecipes = (ev) => {
            menuItemHandler( ev , drawList ,recipeList)
        };
        // menu
        const getChildSum = Model.getWidthsum;
        const bindSlider = Model.bindSliderMenu;
        
        // showTopRecipes({
        //     drawList : drawList,
        //     menuItemHandler : menuItemHandler,
        //     listPlace : recipeList,
        // })
        showTopRecipes();
        initMixologyMenu({
            element : mixMenu , 
            childHandler : menuItemHandler,
            calculateWidth : getChildSum,
            drawArticles : drawList,
            makeSlider : bindSlider,
            articleNest : recipeList
        });
    }
}   