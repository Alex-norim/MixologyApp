
export const Model = {
    bindHandlersTo : ( domElements , handler , eType ) => {
        for (const domElem of domElements ) {
            domElem.addEventListener( eType , handler)
        }
    },
    menuItemHandler : async function(event , putArticle , rootElement){
        event.preventDefault();
        const Href = event.currentTarget.attributes.href.value;
        
        await fetch(Href , {
            method : "GET"
        })
        .then( result => result.json())
        .then( result =>  {
            const articles = result.res; // array of obj 
            putArticle(articles , rootElement);
        })
    }
}