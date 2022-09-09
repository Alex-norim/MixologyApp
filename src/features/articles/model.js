
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
    articleMenuSlider: ( menu , widthSum) => {
        const menuList = menu.firstElementChild;
        console.log(menuList)
        const moveAt = (left , menuList) => {
            let maxWidth = menuList.offsetWidth - menuList.parentNode.offsetWidth + 20;
            if(left > 5){
                left = 5;
            }else if(left < -maxWidth+15){
                left = -maxWidth+15
            }
            menuList.style.left = left + 'px'
        };
        menuList.addEventListener('mousedown' , (event) => {
            let isPressed = true;
            const Target = event.target;
            let isLIelement = event.target.tagName === 'LI'
            let initXpos = event.pageX;
            if(isLIelement){
                Target.setAttribute('style' , "pointer-events:none;")
            }
            // 
            const style = new String( menuList.getAttribute('style') );
            let prevleft = Number(style.match( /(?<=left: ).+?(?=px)/)) || 0;
            // child
            let childs = menuList.querySelectorAll('li');
            let childsWidth = widthSum(childs);
            let parentWidth  = menuList.parentNode.offsetWidth;
            document.onmousemove = (event) => {
                let currXpos = event.pageX;
                
                if(isPressed && childsWidth > parentWidth){
                    let direction = initXpos - currXpos;
                    moveAt( prevleft - direction , menuList);
                }
            };

            document.onmouseup = () => {
                Target.removeAttribute('style');
                isPressed = false;
                document.onmousemove = null;
                document.onmouseup = null;
                console.log('mouse was clicked')
                console.log(isPressed)
            }
        })
    },
    getAdaptArticleMenuWidth: (menu , getChildWidth) => {
        const childs = menu.querySelectorAll('li')
        const ChildsWidth = getChildWidth(childs);
        const windowWidth = window.innerWidth;
        if(ChildsWidth >= windowWidth){
            menu.style.width = '100%'
        }else{
            menu.style.width = ChildsWidth + 10 + 'px';
        }
        
    }
}