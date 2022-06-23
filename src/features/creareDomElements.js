import LocalStorage from "./LocalStorage.mjs";
let temporaryNameOfRecipeList = 'favoriteRecipe';

export default class CreateNewDOM {
    constructor () {
        this._LocalStore = new LocalStorage();
        let isAuthorized = this._LocalStore.getData('name');
    
        
    }
    createFavoriteRecipeList = async (parentElement) => {
        // vars
        let isFaforite   = (this._LocalStore.getData(temporaryNameOfRecipeList)) ? 
                            this._LocalStore.getData(temporaryNameOfRecipeList).split(',')
                            : false ;

        // body
        if ( !isFaforite ) {
            return false;
        }else{
            let bestRecipesID = isFaforite;
            let list = document.createElement('ul');
                list.classList.add('bestRecipesList');
            let getBestRecipes = await fetch( '/auth/getBestRecipes' , {
                method: 'POST' ,
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    arrayOfID : bestRecipesID
                })
                })
                .then( result => {
                    return result.json();
                })
                .then( result => {
                    let counter = 1 ;
                    if(result.list.length <= 1){
                        counter = ''
                    }
                    result.list.forEach( recipe => {
                        let li = document.createElement('li');
                            li.classList.add('bestRecipesListItem');
                            li.textContent = counter + '. ' + recipe;
                        counter++;
                        list.append(li);
                    })
                })
                .catch( err => {
                    return {
                        result : "server not found"
                    }
                });
            
            document.body.append(list)
            
        }
    }

} 