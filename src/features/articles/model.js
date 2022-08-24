
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
    articleMenuSlider: ( element) => {
        const moveAt = (left , element) => {
            let maxWidth = element.offsetWidth - element.parentNode.offsetWidth + 20;
            if(left > 20){
                left = 20;
            }else if(left < -maxWidth){
                left = -maxWidth
            }
            console.log(left)
            element.style.left = left + 'px'
        };
        const childWidthSum = (elems) => {
            let sum = 0;
            for (const iterator of elems) {
                const marginRight = parseInt(getComputedStyle(iterator).marginRight)
                sum+=iterator.offsetWidth + marginRight;
            }
            return sum;
        }
        element.addEventListener('mousedown' , (event) => {
            let isPressed = true;
            let initXpos = event.pageX;
            // 
            const style = new String( element.getAttribute('style') );
            let prevleft = Number(style.match( /(?<=left: ).+?(?=px)/)) || 0;
            // child
            let childs = element.querySelectorAll('li');
            let childWidth = childWidthSum(childs);
            let parentWidth  = element.parentNode.offsetWidth;
            console.log(childWidth , parentWidth)
            document.onmousemove = (event) => {
                let currXpos = event.pageX;
                
                if(isPressed && childWidth > parentWidth){
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
    }
}