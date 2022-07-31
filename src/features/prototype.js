export default class Protos {
    constructor(){
        
    }
}
Protos.prototype.newDom = function( dom , className = false , attr = false , innerContent = false ){
    let el = document.createElement(dom);
    // classname can be array of strings or string
    if (typeof className === 'object'){
        for (const iterator of className) {
            el.classList.add(iterator)
        }
    }else if (typeof className === 'string'){
        el.classList.add(className)
    }else if (className === false){
        
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
    // function
    return el;
}