import {Model as importModel} from '../mixology/model';
import { Menu } from "../menu/menu.js";

export const Model = {
    likeHandler : importModel.likeHandler,
    getRecipeItems : importModel.showSpecificList,
    getBestRecipe : importModel.getBestRecipes,
    logoutHandler : async ( drawModalWindow , root ) => {
        let rejectionFunction = (event) => {
            let target = event.target;
            let parentNode = target.parentNode.parentNode;
                parentNode.style.display = "none";
        };
        let acceptanceFunction = (e) => {
            let target = e.target;
            let parentNode = target.parentNode.parentNode;
                parentNode.style.display = "none";
            let oldMenu = root.querySelector('.mainMenuWrap');
                oldMenu.remove()
            localStorage.removeItem('name');
            localStorage.removeItem('login');
            const refreshMenu = new Menu(root);
            const header = root.querySelector('.header') ;
                header.append(refreshMenu);
            const directToHome = header.querySelector('nav').querySelector('a');
            directToHome.click();
        }
        await fetch('/auth/logout' , {method:'GET'})
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