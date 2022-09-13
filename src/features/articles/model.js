
export const Model = {
    bestArticle: (obj) => {
        const errorMessage = "sorry cant get to server"
        const drawList = obj.renderList;
        const listRoot = obj.listRoot;
        const drawError = obj.renderError;
        const errorRoot = obj.errorRoot
        fetch('/articles/get_highest_article')
            .then( result => result.json())
            .then( json => {
                const response = json.response;
                response ?
                    drawList(response , listRoot) : 
                    drawError( errorMessage , errorRoot);
            } )
            .catch(err => {
                drawError( errorMessage , errorRoot);
            })
    },
    menuItemHandler : async function(event , drawArticles , rootElement){
        event.preventDefault();
    
        const Href = event.currentTarget.querySelector('a').getAttribute('href')
        
        await fetch(Href , {
            method : "GET"
        })
        .then( result => result.json())
        .then( result =>  {
            const articles = result.res; // array of obj 
            drawArticles(articles , rootElement);
        })
    },
    childWidthSum : (childs) => {
        let sum = 0;
        let marRight = 0;
        for (const iterator of childs) {
            const marginRight = parseInt(getComputedStyle(iterator).marginRight);
            marRight = marginRight;
            sum+=iterator.offsetWidth + marginRight;
        }
        return sum - marRight;
    },
    articleMenuSlider: ( menu , widthSum) => {
        const menuList = menu.firstElementChild;
        const moveAt = (left , menuList) => {
            let maxWidth = menuList.offsetWidth - menuList.parentNode.offsetWidth + 20;
            if(left > 5){
                left = 5;
            }else if(left < -maxWidth+15){
                left = -maxWidth+15
            }
            menuList.style.left = left + 'px'
        };
        const wheelhandler = (e) => {
            e.preventDefault();
            const thisMenu = e.currentTarget;
            const deltaY = e.deltaY;
            const style = new String( menuList.getAttribute('style') );
            let prevleft = Number(style.match( /(?<=left: ).+?(?=px)/)) || 0;

            if(deltaY > 0){
                moveAt(prevleft - 10 , menuList)
            }else if(deltaY<0){
                moveAt(prevleft + 10 , menuList)
            }
        }
        const mouseDownhandler = (event) => {
            let isPressed = true;
            const Target = event.target.parentNode;
            let isLIelement = event.target.tagName === 'A'
            let initXpos = event.pageX;
            if(isLIelement){
                
                Target.setAttribute('style' , "pointer-events:none;")
            }
            // 
            const style = new String( menuList.getAttribute('style') );
            let prevleft = Number(style.match( /(?<=left: ).+?(?=px)/)) || 0;
            // child
            let childs = menuList.querySelectorAll('a');
            let childsWidth = widthSum(childs);
            let parentWidth  = menuList.parentNode.offsetWidth;
            document.onmousemove = (event) => {
                let currXpos = event.pageX;
                console.log('pressed')
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
            }
        }
        
        menuList.addEventListener('mousedown' , mouseDownhandler);
        menuList.addEventListener('mouseover' , (e)  => {
            menuList.addEventListener('mousewheel' , wheelhandler , {passive:false});
        } )
        menuList.addEventListener('mouseleave' , (e) => {
            menuList.removeEventListener('mousewheel' , wheelhandler)
        })
    },
    initArticleMenu: (obj) => {
        const Menu = obj.element;
        const menuItemHandler = obj.childHandler;
        const calculateWidth = obj.calculateWidth;
        const drawArticles = obj.drawArticles;
        const bindSliderTo = obj.makeSlider;
        const Nest = obj.articleNest;
        const childs = Menu.querySelectorAll('li');

        if(childs.length < 1){
            return false;
        }
        const ChildsWidth = calculateWidth(childs);
        const windowWidth = window.innerWidth;

        console.log(ChildsWidth , windowWidth)
        if(ChildsWidth >= windowWidth){
            console.log('x')
            Menu.style.width = '100%'
        }else{
            console.log('y')
            Menu.style.width = ChildsWidth + 10 + 'px';
        }
        bindSliderTo(Menu , calculateWidth );
        childs.forEach( element => {
            element.addEventListener('click' , (e) => {
                menuItemHandler( e ,  drawArticles , Nest)
            })
        });
        
    }
}