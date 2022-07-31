import likeImage from '../../public/svg/like.svg';

class createElement {
    // props is an obj
    // { tahName : 'div' , attr : {type : "button"} , content : 'hello' , listeners : { keyup : func }}
    constructor ( props ) {
        this.tagName = props.tagname;
        this.attrs = props.attr;
        this.content = props.content;
        this.listeners = props.handler;
        return this.getElement();
    }
    getElement () {
        let element = document.createElement( this.tagName );
        for (const key in this.attrs) {
            const attrname = key;
            const prop = this.attrs[key];
            element.setAttribute(attrname , prop);
        }
        this.content ? 
            element.innerHTML = this.content : ``;
        if(this.listeners){
            for (const key in this.listeners) {
                let eventName = key;
                let func  = this.listeners[key];
                // console.log(eventName , func)
                element.addEventListener(eventName , func);
            }
        }
        return element;
    } 
}
export const View = {
    drawRecipeList : (array , best = false , likeHandler ) => {
        for (const [index , values ]  of array.entries() ) {
            let recipe = values.recipe;
            let rating = values.rating !== 0 ? values.rating : '0' ;
            let id     = values.id;
            let isMatch = best ? best.includes(id) : best ;
            // childs of li 
            let recipeText = new createElement({
                tagname: 'span' ,
                attr : {
                    class : "recipeText"
                },
                content : (array.length <=1)? recipeText.innerHTML = recipe : recipeText.innerHTML = counter+'. ' + recipe
            })
            //child of li
            let ratingTextNode = new createElement({
                tagname : 'span' ,
                attr : {
                    class : 'recipeRating'
                },
                content : rating
            })
            //child
            let wrapper = new createElement({
                tagName : 'div',
                attr : {
                    class : 'recipeWrap',
                    "data-id" : id
                },
                content : ratingTextNode + likeImage ,
                listeners : {
                    click : likeHandler
                }
            })
            
            if(isMatch){
                let likeBtn = wrapper.querySelector('.svgpath');
                    likeBtn.setAttribute('fill' , color);
    
                ratingTextNode.setAttribute('style' , 'color:' + color )
                
            }else{
                let likeBtn = wrapper.querySelector('.svgpath');
                    likeBtn.setAttribute('fill' , defColor);
                ratingTextNode.setAttribute('style' , 'color:' + defColor )
            }
            // main element
            const li = new createElement({
                tagname : 'li',
                attr : {
                    class : 'recipe-list-item'
                },
                content : recipeText  + wrapper
            })
            return li;
        };
    },
    mixologyHandler : function(){
        let recipeList = (parent , arrayListOfRecipe) => {
            let _root = parent;
                _root.classList.add('recipe-list');
            if(typeof arrayListOfRecipe[0] === 'string'){
                _root.textContent = 'Server not found'
            }else if(arrayListOfRecipe === false){
                _root.textContent = 'Empty list'
            }else{
                fetch("/auth/getBestRecipes" , {
                    method: "POST",
                    headers:{
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify({
                        login : localStorage.getItem('login')
                    })
                })
                .then(result => {
                    return result.json();
                })
                .then( result => {
                    if (result.res !== false ) {
                        let favoriteList = result.res.map( elem => {
                            return elem.id
                        });
                        renderList(arrayListOfRecipe , favoriteList)
                    }else{
                        renderList(arrayListOfRecipe)
                    }
                })
                .catch(err => {
                    throw err;
                })
            }
        }
        // getting single item
        let parent = this.root.getElementsByClassName('mixologyID')[0] ;
        
        let title  = parent.getElementsByClassName('listTitleId')[0];
        let listRoot = parent.getElementsByClassName('recipeListId')[0];
        let showTopTenRecipes = async () => {
            await fetch("/mixology/topten" , {
                method : "GET",
            })
            .then( result => {
                return result.json();
            }).then( result => {
                let category = result.category;
                let recipes  = result.list;
                let hasAccsessToServer = result.database;
                recipeList(listRoot , recipes)
            })
            .catch( err => {
                throw err;
            })
        }
        showTopTenRecipes();
        // getting multiple items
        let mixologyMenuButtons = Object.values(parent.getElementsByClassName('menu-main-link'));
        // handlers
        let getRecipe = async (event) => {
            event.preventDefault();
            let request = event.target.getAttribute('href');
            //animation of waiting
            listRoot.innerHTML = this.pendingAnimation;
            // getting from server
            let data = await fetch( request , {method : 'GET'})
            .then( result => {
                listRoot.innerHTML = '';
                return result.json();
            })
            .catch(err=>{
                throw err;
            });
            let category = data.category;
            let recipes  = data.list;
            let hasAccsessToServer = data.database;
            // title 
            title.innerHTML = "Top 10 " + category + " recipes";
                // if db is available;
            if(hasAccsessToServer){
                // there is creating the list of recipes
                this._createDOM.recipeList(listRoot , recipes);
            }else{
                // if database not found
                let errorMessage = data.list[0];
                let li = document.createElement('li');
                    li.classList.add('recipe-list-item');
                    li.innerHTML = errorMessage;
                listRoot.append(li);
            }   
            
        };
        mixologyMenuButtons.forEach( item => {
            item.addEventListener('click' , getRecipe );
        })
    }
}