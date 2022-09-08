import {Model as importModel} from '../mixology/model';
import { Menu } from "../menu/menu.js";

export const Model = {
    likeHandler : importModel.likeHandler,
    getRecipeItems : importModel.showSpecificList,
    getBestRecipe : importModel.getBestRecipes,
    logoutHandler : ( drawModalWindow , root ) => {
        let rejectionFunction = (event) => {
            let target = event.target;
            let parentNode = target.parentNode.parentNode;
                parentNode.style.display = "none";
        };
        let acceptanceFunction = (e) => {
            let target = e.target;
            let parentNode = target.parentNode.parentNode;
                parentNode.style.display = "none";
            const newMenu = new Menu(root);
            const directToHome = root.querySelector('a.home')
            directToHome.click();
            newMenu.initMenu();
        }
        fetch('/auth/logout' , {method:'GET'})
            .then( result=> {
                return result.json();
            })
            .then( result => {
                if(result.res){
                    let modalWindow = drawModalWindow( "Are you sure?" , acceptanceFunction , rejectionFunction );
                    root.append(modalWindow);
                }
            })
            .catch(err => {
                throw err
            })
    }
}