export default class Protos {
    constructor(){

    }
}
Protos.prototype.newDom = function( dom , className , attr = false , innerContent = false){
    let el = document.createElement(dom);
    // classname can be arraoy of strings or string
    if (typeof className === 'object'){
        for (const iterator of className) {
            el.classList.add(iterator)
        }
    }else if (typeof className === 'string'){
        el.classList.add(className)
    }
    // attr should be object 
    if ( attr ) {
        for (const key in attr) {
            let propName = key;
            let property = attr[key];
            el.setAttribute( propName , property);
        }
    }

    // inner content
    innerContent ? el.innerHTML = innerContent  : el.innerHTML = '';
    return el;
}