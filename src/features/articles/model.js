
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
    },
    childWidthSum : (elems) => {
        let sum = 0;
        let marRight = 0;
        for (const iterator of elems) {
            const marginRight = parseInt(getComputedStyle(iterator).marginRight);
            marRight = marginRight;
            sum+=iterator.offsetWidth + marginRight;
        }
        return sum - marRight;
    },
    articleMenuSlider: ( element , widthSum) => {
        const moveAt = (left , element) => {
            let maxWidth = element.offsetWidth - element.parentNode.offsetWidth + 20;
            if(left > 20){
                left = 20;
            }else if(left < -maxWidth){
                left = -maxWidth
            }
            element.style.left = left + 'px'
        };
        element.addEventListener('mousedown' , (event) => {
            let isPressed = true;
            let initXpos = event.pageX;
            // 
            const style = new String( element.getAttribute('style') );
            let prevleft = Number(style.match( /(?<=left: ).+?(?=px)/)) || 0;
            // child
            let childs = element.querySelectorAll('li');
            let childsWidth = widthSum(childs);
            let parentWidth  = element.parentNode.offsetWidth;
            document.onmousemove = (event) => {
                let currXpos = event.pageX;
                
                if(isPressed && childsWidth > parentWidth){
                    let direction = initXpos - currXpos;
                    moveAt( prevleft - direction , element);
                }
            };

            document.onmouseup = () => {
                isPressed = false;
                document.onmousemove = null;
                console.log('mouse was clicked')
                console.log(isPressed)
            }
        })
    },
    articleMenuWidth: (menu , getChildWidth) => {
        const parent = menu.parentNode;
        const childs = menu.querySelectorAll('li')
        const ChildsWidth = getChildWidth(childs);
        const windowWidth = window.innerWidth;
        if(ChildsWidth >= windowWidth){
            parent.style.width = '100%'
        }else{
            parent.style.width = ChildsWidth + 10*2 + 'px';
        }
        
    }
}