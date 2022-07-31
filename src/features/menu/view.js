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
    drawMenu : function(props){
        // props of an array of objs
        let elements = props;
        const mobileButtonSetting = elements.pop();
        const otherSettings = elements;
        const mobileButton = new createElement(mobileButtonSetting);
        let nav = new createElement({
            tagname : 'nav',
            attr: {
                class : "mainMenuWrap"
            },
        });
        for (const setting of otherSettings) {
            const MenuItem = new createElement(setting);
            nav.append(MenuItem);
        }
        nav.prepend(mobileButton)
        return nav;
    }
}