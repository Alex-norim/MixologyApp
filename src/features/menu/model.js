export const Model = {
    updateState : function( newState ){
        this.menuState.path = newState;
    },
    personalCabinet : function(event , useCabinet) {
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
            useCabinet(this.root);
        })
        .catch( err => {
            throw err;
        })
    },
    renderServerResponse : function (event , currentHandler = false , root = false ) {
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
            currentHandler && root ? currentHandler(root) : `` ;
        })
        .catch( err => {
            throw err;
        })
    }, 
    mobileMenuHandler : (event) => {
        const root = event.currentTarget.parentNode;
        // toggle funcs use this var to define time till hide items
        let timeTillHide = 400;
        let menuListItems = root.getElementsByClassName('menu-main-link');
        let lines = root.getElementsByClassName('line');
        let displayStatus =  root.style.display;
        let toggleLines = (elems , showup) => {
            const menuLineFrames = [
                [{transform: 'rotate(0deg)' , marginTop: 0} , {transform: 'rotate(45deg)' , marginTop: '15px'}] ,
                [{transform: 'rotate(0deg)' ,display: 'block' , left : 0 , width : "100%"} , {transform: "rotate(360deg)", left : "50%" , width: 0}] ,
                [{transform: "rotate(0deg)", marginBottom: "1px"} , {transform: 'rotate(-45deg)' , marginBottom: '14px' }] 
            ];
            let iterator = 0;
            for (const menuItem of elems) {
                menuItem.animate( 
                    menuLineFrames[iterator]    
                , {
                    delay : 0,
                    direction : showup ? "normal": "reverse",
                    duration : timeTillHide , 
                    iterations : 1 ,
                    fill : "forwards"
                });
                iterator++;
            }
            
        }
        let toggleMenuItems = (obj , showup) => {
            let menuItemsFrames = [
                [{top : "20px" } , {top : '20px' } ],
                [{top : "20px" } , {top : '62px' } ],
                [{top : "20px" } , {top : '104px'} ],
                [{top : "20px" } , {top : '146px'} ]
            ];
            let iterator = 0;
            for (const menuElement of obj) {
                menuElement.addEventListener('click' , (event) => {
                    let isMobileMenu = root.getAttribute('style') || false ; 
                    let windowWidth = window.innerWidth;
                    // check if the menu is web page state
                    if(windowWidth <= 750) { 
                        console.log('>750')
                        toggleLines(lines , showup ? false : true)
                        toggleMenuItems(obj , showup ? false : true)
                    }
                })
                menuElement.animate( 
                    menuItemsFrames[iterator]    
                , {
                    delay : 0,
                    direction : showup ? "normal" : "reverse",
                    duration : timeTillHide , 
                    iterations : 1 ,
                    fill : "forwards"
                });
                if(showup){
                    menuElement.style.display = 'block';
                }else if(!showup){
                    setTimeout( () => {
                        menuElement.style.display = '';
                    } , timeTillHide )
                }
                iterator++;
                // 
            }
        }
        if(displayStatus === 'flex'){
            toggleLines(lines , false)
            toggleMenuItems(menuListItems , false);
            root.style.display = '';
        }else if (displayStatus === ''){
            toggleLines(lines , true)
            toggleMenuItems(menuListItems , true);
            root.style.display = 'flex';
        }
        
    },
}