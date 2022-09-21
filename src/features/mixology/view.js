import likeImage from '../../public/svg/like.svg';
import {createElement} from '../appSettings/commonFunctions';
import likeHandler from "../appSettings/likeHandler";

export const View = {
    drawRecipeList : (array, ListRoot , userLogged , getFavorite = null) => {
        const createArrayElements = (array, favorites = false) => {
            const defColor = "rgb(182 179 179)";
            const highlight = '#ffffff';
            ListRoot.innerHTML = '';
            for (const [index , values ]  of array.entries() ) {
                // <----- errror
                // --------> ok
                let recipe = values.recipe;
                let rating = values.rating !== 0 ? values.rating : '0' ;
                let id     = values.id;
                
                const matchID = favorites ? favorites.find( el => {
                    let elemID = el.id;
                    return elemID === id;
                }) : false;
                // childs of li 
                let recipeText = new createElement({
                    tagname: 'span' ,
                    attr : {
                        class : "recipeText"
                    },
                    content : (array.length <=1)?  recipe :  index + 1 +'. ' + recipe
                })
                let ratingTextNode = new createElement({
                    tagname : 'span' ,
                    attr : {
                        class : 'recipeRating',
                        style : matchID ? ` color:${highlight} ` : ` color:${defColor} `
                    },
                    content : rating
                })
                
                let likeButton = new createElement({
                    tagname : 'div',
                    attr : {
                        class : 'recipeWrap',
                        "data-id" : id
                    },
                    content : likeImage,
                    handler : {
                        click : userLogged ? likeHandler : ()=>{},
                    }
                })
                likeButton.prepend( ratingTextNode);
                // main element
                const li = new createElement({
                    tagname : 'li',
                    attr : {
                        class : 'recipe-list-item'
                    }
                })
                li.append(recipeText,likeButton);
                ListRoot.append(li)
            };
        };

        if(userLogged){
            getFavorite
                .then(result => {
                    const favorites = result.res;
                    createArrayElements(array , favorites)
                })
        }else{
            createArrayElements(array , false);
        }
        
    },
    
}
// if(userLogged){
//     getFavorite
//         .then(result => {
//             console.log(result)
//         })
//     let likeBtn = wrapper.querySelector('.svgpath');
//         likeBtn.setAttribute('fill' , color);
//         ratingTextNode.setAttribute('style' , 'color:' + color )
//         wrapper.handler = {
//             click : likeHandler
//         }
// }else{
//     let likeBtn = wrapper.querySelector('.svgpath');
//         likeBtn.setAttribute('fill' , defColor);
//     ratingTextNode.setAttribute('style' , 'color:' + defColor )
// }