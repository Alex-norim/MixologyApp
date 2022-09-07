import { Model } from "./model";
import { View } from "./view";

export const Cabinet = {
    init : ( _root) => {
        const root = _root;
        const listRoot = root.querySelector('.favoriteRecipeList');
        const pcRoot = root.querySelector('.personalCab');
        const logOutButton = root.querySelector('.logout');
        const shareRecipeButton = root.querySelector('#suggest');
        
        // handlers 
        const showBestRecipes = Model.getBestRecipe();
        const drawWindow = View.drawModalWindow;
        const logoutHandler = Model.logoutHandler;
        // suggest new recipe
        const getCategory = Model.getCategory();
        const FormHandler = Model.formHandler;
        const drawSuggestForm = View.showForm;
        const makeMoveable = Model.makeMoveable
        // rendering personal cab items 
        logOutButton.addEventListener('click' , () => { logoutHandler( drawWindow , root ) });
        shareRecipeButton.addEventListener('click' , () => { 
            drawSuggestForm( getCategory , FormHandler , root , makeMoveable ) })
        // shareRecipeButton
        showBestRecipes.then( result => {
            const drawRecipeList = View.drawRecipeList;
            const likeHandler = Model.likeHandler;
            let recipes = result.res; // array
            const listItems = drawRecipeList( recipes , recipes , likeHandler);
            listItems.forEach( item => {
                listRoot.append(item);
            })
        });
        
    }
}
