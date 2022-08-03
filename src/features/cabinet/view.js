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
import { View as importedView } from "../mixology/view";
export const View = {
    drawModalWindow : (text , acceptFunc , rejectFunc) => {
        let acceptBtn = new createElement({
            tagname : 'button' ,
            attr : {
                class : 'button'
            },
            content : 'accept',
            handler : {
                click : acceptFunc
            }
        });
        let rejectBtn = new createElement({
            tagname : 'button' ,
            attr : {
                class : 'button'
            },
            content : 'reject',
            handler : {
                click : rejectFunc
            }
        });
        let title = new createElement({
            tagname : 'span' ,
            attr : {
                class : 'modalWindowTitle'
            },
            content : text,
        });
        let modalWindow = new createElement({
            tagname : 'div' ,
            attr : {
                class : 'modalWindow'
            },
        });
            modalWindow.append( title , acceptBtn , rejectBtn)
        let modalWindowWrap = new createElement({
            tagname : 'div' ,
            attr : {
                class : 'modalWindowWrap'
            },
            content : '',
        });
            modalWindowWrap.append(modalWindow);
        return modalWindowWrap;
    },
    drawRecipeList : importedView.drawRecipeList,
}