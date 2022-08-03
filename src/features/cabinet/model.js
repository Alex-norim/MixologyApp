import {Model as importModel} from '../mixology/model';

export const Model = {
    likeHandler : importModel.likeHandler,
    getRecipeItems : importModel.showSpecificList,
    getBestRecipe : importModel.getBestRecipes,
    logoutHandler : ( drawModalWindow , root , redrawnMenu) => {
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
            let newMenu = redrawnMenu ;
            const header = root.querySelector('.header') ;
                header.append(newMenu);
        }
        let modalWindow = drawModalWindow( "Are you sure?" , acceptanceFunction , rejectionFunction );
        root.append(modalWindow);
    } ,
}