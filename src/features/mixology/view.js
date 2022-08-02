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
    drawRecipeList : (array , best = false , likeHandler = false ) => {
        const defColor = "rgb(182 179 179)";
        const color = '#ffffff';
        let list = [];
        for (const [index , values ]  of array.entries() ) {
            const error = typeof values === 'string';
            if( error ) { list.push( 
                new createElement({
                    tagname : 'li' ,
                    attr : { class : 'recipe-list-item' },
                    content : values 
                }));
                return list;
            };
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
                content : (array.length <=1)?  recipe :  index + 1 +'. ' + recipe
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
                tagname : 'div',
                attr : {
                    class : 'recipeWrap',
                    "data-id" : id
                },
                content : likeImage ,
                handler : {
                    click : likeHandler ? likeHandler : () => {} ,
                }
            })
            wrapper.prepend( ratingTextNode)
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
                }
            })
            li.append(recipeText,wrapper);
            list.push(li)
        };
        return list;
    },
    
}