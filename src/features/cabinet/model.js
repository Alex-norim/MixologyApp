import {Model as importModel} from '../mixology/model';
import Validator from '../validator';
export const Model = {
    likeHandler : importModel.likeHandler,
    getRecipeItems : importModel.showSpecificList,
    getBestRecipe : importModel.getBestRecipes,
    logoutHandler : async ( drawModalWindow , root , redrawnMenu) => {
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
    } ,
    getCategory : async () => {
        return await fetch( '/auth/getcategory' , {method: 'GET'})
        .then( result => {
            return result.json();
        })
        .catch(err => {
            return {
                res : "server not found"
            }
        })
    },
    formHandler : (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        let formData = new FormData (event.target);
        let Error = new Validator( formData.get('newrecipe') , 'text').getErrors();
        // let category  = new Validator( formData.get('flavor')    , 'name');
        // let strength  = formData.get('strength');
        let errorMessageNest = target.getElementsByClassName("error-message")[0]; 
        // --->
        
        typeof Error[0] !== 'object' ?
            fetch( "/auth/recomendnewrecipe" , {
                method : "POST",
                body : new URLSearchParams(new FormData(event.target))
            })
            .then( result => {
                return result.json();
            })
            .then( result => {
                let isAdded = result.isAdded;
                let response = result.res;
                isAdded ?
                    errorMessageNest.textContent = response : 
                    errorMessageNest.textContent = response ;
                target.reset();
                setTimeout( () => {
                    errorMessageNest.textContent = '';
                } , 800)
            })
            .catch( err => {
                throw err
            }) : 
            errorMessageNest.textContent = 'Some trouble';
        // <--

    },
}