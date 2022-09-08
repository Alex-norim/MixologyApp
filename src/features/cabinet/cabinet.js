import { Model } from "./model";
import { View } from "./view";
import Form from "../form/form";
export const Cabinet = {
    init : ( _root) => {
        const root = _root;
        const listRoot = root.querySelector('.favoriteRecipeList');
        const logOutButton = root.querySelector('.logout');
        const shareRecipeButton = root.querySelector('#suggest');
        const newForm = new Form(root);
        // handlers 
        const showBestRecipes = Model.getBestRecipe();
        const drawWindow = View.drawModalWindow;
        const logoutHandler = Model.logoutHandler;
        // suggest new recipe
        // rendering personal cab items 
        logOutButton.addEventListener('click' , () => { logoutHandler( drawWindow , root ) });
        shareRecipeButton.addEventListener('click' , () => { 
            newForm.offerForm(); 
        })
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
