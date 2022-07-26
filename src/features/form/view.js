class createFormElement {
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
    // requred items is array of objects , for instance 
    // [{tagname : div , attr : {type : text} , content is optional , listeners is optional }]
    getForm : ( requredItems , formType = true ) => {
        let currentWrapClass = (formType) ? ' signInWrap' : ' signUpWrap';
        let currentFormClass = (formType) ? ' sign-in'    : ' sign-up';
        let currentAction    = (formType) ? 'signin'      : 'signup';
        let currentmethod    = (formType) ? 'POST'        : 'GET';
        const wrapProps = {
            tagname : 'div' ,
            attr : {
                class : "defbox" + currentWrapClass,
            }
        };
        const lastArrayItem = requredItems.pop();
        
        if( lastArrayItem === false ) {
            let arr = [];
            requredItems.forEach( elementProps => {
                let item = new createFormElement(elementProps);
                arr.push(item)
            });
            return arr;
        }else{
            const formProps = {
                ...lastArrayItem,
                attr : {
                    class : "form" + currentFormClass ,
                    action : "/auth/" + currentAction ,
                    method : currentmethod 
                }
            }
            const form = new createFormElement(formProps);

            // go through the array
            requredItems.forEach( elementProps => {
                let newItem = new createFormElement(elementProps);
                form.append(newItem);
            });
            const formWrap = new createFormElement(wrapProps);
            formWrap.append(form);
            return formWrap;
        }
        
    },
}

