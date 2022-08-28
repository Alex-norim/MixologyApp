import { Model } from "./model";
import { View } from "./view";
import { Menu } from "../menu/menu.js";

export const Cabinet = {
    init : ( _root) => {
        const root = _root;
        const listRoot = root.querySelector('.favoriteRecipeList');
        const pcRoot = root.querySelector('.personalCab');
        const logOutButton = root.querySelector('.logout');
        // handlers 
        const showBestRecipes = Model.getBestRecipe();
        const drawWindow = View.drawModalWindow;
        const logoutHandler = Model.logoutHandler;
        const refreshMenu = new Menu(root , ()=> {console.log('x')}).getMenu({isLogged : false});

        // suggest new recipe
        const getCategory = Model.getCategory();
        const FormHandler = Model.formHandler;
        const drawSuggestForm = View.suggestNewRecipe;
        // rendering personal cab items 
        logOutButton.addEventListener('click' , () => { logoutHandler( drawWindow , root , refreshMenu) });
        showBestRecipes.then( result => {
            console.log(result)
            console.log('ffffffffffff')
            const drawRecipeList = View.drawRecipeList;
            const likeHandler = Model.likeHandler;
            let recipes = result.res; // array
            const listItems = drawRecipeList( recipes , recipes , likeHandler);
            listItems.forEach( item => {
                listRoot.append(item);
            })
        });
        // rendering suggest new recipe 
        drawSuggestForm( getCategory , FormHandler , pcRoot);
    }
}
