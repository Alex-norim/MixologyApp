// interface stringMap { [key:string]:string}
class createElement {
    // tagName:string;
    // attrs:stringMap;
    // content: (a:string) => {};
    // listeners : {};
    // Element: HTMLElement;
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
            
            if(attrname === 'style'){
                const getStringprops = JSON.stringify(this.attrs[attrname]).slice(2,-2).replace(/,/gi , ';').replace(/"/gi,'');
                element.setAttribute(attrname , getStringprops);
            }else{
                const prop = this.attrs[key];
                element.setAttribute(attrname , prop);
            }
            
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
        this.Element = element;
        return element;
    }
}
const getBestRecipes = async () => {
    return await fetch( '/auth/getBestRecipes' , {
        method : 'GET'
    })
    .then( result => {
        return result.json();
    })
    .catch( err => {throw err})
};

export {createElement ,getBestRecipes}