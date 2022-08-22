
export const Model = {
    bindHandlersTo : ( domElements , handler , eType ) => {
        for (const domElem of domElements ) {
            domElem.addEventListener( eType , handler)
        }
    },
    bestArticle: (renderArticles , root) => {
        fetch('/articles/get_highest_article')
            .then( result => result.json())
            .then( json => {
                const data = json.response;
                renderArticles(data , root)
            } )
            .catch(err => 'server not found')
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