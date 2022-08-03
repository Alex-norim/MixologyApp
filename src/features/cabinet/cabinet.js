import { Model } from "./model";
import { View } from "./view";
import { Menu } from "../menu/menu.js";

export const Cabinet = {
    init : ( _root) => {
        const root = _root;
        const listRoot = root.querySelector('.favoriteRecipeList');
        const logOutButton = root.querySelector('.logout');
        // handlers 
        const getBestRecipes = Model.getBestRecipe();
        const drawWindow = View.drawModalWindow;
        const logoutHandler = Model.logoutHandler;
        const refreshMenu = new Menu(root , ()=> {console.log('x')}).getMenu({isLogged : false});

        logOutButton.addEventListener('click' , () => { logoutHandler( drawWindow , root , refreshMenu) });

        getBestRecipes.then( result => {
            const drawRecipeList = View.drawRecipeList;
            const likeHandler = Model.likeHandler;
            let recipes = result.res; // array
            const listItems = drawRecipeList( recipes , recipes , likeHandler);
            listItems.forEach( item => {
                listRoot.append(item);
            })
        })
    }
}
        // let root = this.root.getElementsByClassName('personalCab')[0];
        // let logOutButton = root.getElementsByClassName('logout')[0];

        // // createList
        // fetch ("/auth/getBestRecipes", {
        //     method: "POST" , 
        //     headers :{
        //         'Content-Type': 'application/json'
        //     },
        //     body : JSON.stringify({
        //         login : localStorage.getItem('login')
        //     })
        // }).then( result => {
        //     return result.json();
        // }).then( body => {
        //     this._createDOM.recipeList( this.root.getElementsByClassName("favoriteRecipeList")[0] , body.res)
        // })
        // // new recomendation 
        // this._createDOM.suggestNewRecipe(root)