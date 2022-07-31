export const Model = {
    updateState : function( newState ){
        this.menuState.path = newState;
    },
    personalCabinet : function(event) {
        //animation of waiting
        const target = event.currentTarget;
        const HrefRequest = target.attributes.href.value;
        const userlogin = localStorage.getItem('login');
        const username  = localStorage.getItem('name');
        let root = this.root;
        let bodyContent = root.getElementsByClassName('body-content')[0];
            // bodyContent.innerHTML = this.pendingAnimation;
        fetch(HrefRequest , {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ login : userlogin , name : username})
        })
        .then( result => {
            return result.json();
        } )
        .then( result => {
            let name = result.userName;
            let HTML = ` <div class="personalCab"> ` +
                            `<h2 class="title">Hello <span>${name}</span></h2>`+
                            `<button class="button logout">Log out</button>`+
                            `<div class="defbox">`+
                                `<h3 class="deftitle">Your favorite mix list</h3>`+
                                `<ul class="favoriteRecipeList"></ul>`+
                            `</div>`+
                        `</div> `;
            bodyContent.innerHTML = HTML;
        })
        .catch( err => {
            throw err;
        })
    },
    renderServerResponse : function (event , currentHandler = false) {
        event.preventDefault();
        let bodyContent = this.root.getElementsByClassName('body-content')[0];
        let HrefRequest = event.target.getAttribute('href');
        
        fetch(HrefRequest , {
            method : "GET"
        })
        .then( result => {
            return result.text();
        })
        .then ( text => {
            bodyContent.innerHTML = text;
            currentHandler ? currentHandler() : `` ;
        })
        .catch( err => {
            throw err;
        })
    }, 
    mobileMenuHandler : (event) => {
        // toggle funcs use this var to define time till hide items
        let timeTillHide = 400;
        let menuList = this._root.getElementsByClassName('menu-main')[0];
        let menuListItems = Object.entries (menuList.getElementsByClassName('menu-main-link'));
        let displayStatus =  menuList.style.display;
        let lines = Object.entries (this._root.getElementsByClassName('smallScreenButton')[0].getElementsByClassName('line'));
        let toggleLines = (obj , showup = false) => {
            let menuLineFrames = [
                [{transform: 'rotate(0deg)' , marginTop: 0} , {transform: 'rotate(45deg)' , marginTop: '15px'}] ,
                [{transform: 'rotate(0deg)' ,display: 'block' , left : 0 , width : "100%"} , {transform: "rotate(360deg)", left : "50%" , width: 0}] ,
                [{transform: "rotate(0deg)", marginBottom: "1px"} , {transform: 'rotate(-45deg)' , marginBottom: '14px' }] 
            ];
            obj.forEach( item => {
                let key = Number(item[0]);
                let element = item[1];
                element.animate( 
                    menuLineFrames[key]    
                , {
                    delay : 0,
                    direction : showup ? "normal": "reverse",
                    duration : timeTillHide , 
                    iterations : 1 ,
                    fill : "forwards"
                })
            })
        }
        let toggleMenuItems = (obj , showup) => {
            let menuItemsFrames = [
                [{top : "20px" , display : 'none'} , {top : '20px' , display : 'block' }],
                [{top : "20px" , display : 'none'} , {top : '62px' , display : 'block'} ],
                [{top : "20px" , display : 'none'} , {top : '104px' , display : 'block'} ],
                [{top : "20px" , display : 'none'} , {top : '146px' , display : 'block'} ]
            ];
            obj.forEach( item => {
                let key = Number(item[0]);
                let element = item[1];
                
                element.addEventListener('click' , (event) => {
                    let isMobileMenu = event.target.parentNode.getAttribute('style') || false ; 
                    let windowWidth = window.innerWidth;
                    // check if the menu is in expanded state 
                    isMobileMenu ? toggleLines(lines , false) : '';
                    if(windowWidth <= 750) { 
                        menuList.style.display = 'none';
                    }
                })
                
                let anim = element.animate( 
                    menuItemsFrames[key]    
                , {
                    delay : 0,
                    direction : showup ? "normal" : "reverse",
                    duration : timeTillHide , 
                    iterations : 1 ,
                    fill : "forwards"
                });
            })
        }
        
        if(displayStatus === 'flex'){
            toggleLines(lines , false)
            toggleMenuItems(menuListItems , false);
            
            setTimeout( () => {
                menuList.style.display = 'none';
            } , timeTillHide + 10 );
            
        }else{
            toggleLines(lines , true)
            toggleMenuItems(menuListItems , true)
            menuList.style.display = 'flex';
        }
        
    },
}