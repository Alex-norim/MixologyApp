import { Model } from "./model";
import { View } from "./view";
import Form from "../form/form";
import { getBestRecipes as GetFavorite  } from "../appSettings/commonFunctions";
export const Cabinet = {
    init : ( event , _root) => {
        const root = _root;
        const logOutButton = root.querySelector('.logout');
        const shareRecipeButton = root.querySelector('#suggest');
        const listRoot = root.querySelector('.favoriteRecipeList')
        const newForm = new Form(root);
        // handlers 
        const drawFavoriteList = View.drawRecipeList;
        // const 
        const drawWindow = View.drawModalWindow;
        const logoutHandler = Model.logoutHandler;
        // suggest new recipe
        // rendering personal cab items 
        logOutButton.addEventListener('click' , () => { logoutHandler( drawWindow , root ) });
        // shareRecipeButton
        shareRecipeButton.addEventListener('click' , () => { 
            newForm.offerForm(); 
        })
        GetFavorite()
            .then(result => {
                const array = result.res;
                drawFavoriteList(array ,listRoot,true,GetFavorite())
            })
        
        
    }
}
