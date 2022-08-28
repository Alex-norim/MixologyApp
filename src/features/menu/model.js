import scrollBar from "../scrollBar/scrollBar.js";
export const Model = {
    updateState : function( newState ){
        this.menuState.path = newState;
    },
    personalCabinet : function(event , useCabinet , _root) {
        let root = _root;
        let bodyContent = root.querySelector('.body-content');
        
        fetch('/auth/personalCabinet')
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
                useCabinet(root);
            })
            .catch( err => {

                throw err;
            })
    },
    renderServerResponse : function (event , currentHandler , root = false ) {
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
                [{transform: 'rotate(0deg)' , marginTop: 0} , {transform: 'rotate(45deg)' , marginTop: '17px'}] ,
                [{transform: 'rotate(0deg)' ,display: 'block' , left : 0 , width : "100%"} , {transform: "rotate(360deg)", left : "50%" , width: 0}] ,
                [{transform: "rotate(0deg)", marginBottom: "1px"} , {transform: 'rotate(-45deg)' , marginBottom: '20px' }] 
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
                [{top : "42px" } , {top : "42px" } ],
                [{top : "42px" } , {top : '84px' } ],
                [{top : "42px" } , {top : '126px'} ],
                [{top : "42px" } , {top : '168px'} ]
            ];
            let menuItemsFrames2 = [
                [{top : "72px" } , {top : "72px" } ],
                [{top : "72px" } , {top : '114px' } ],
                [{top : "72px" } , {top : '156px'} ],
                [{top : "72px" } , {top : '198px'} ]
            ];
            const windowSize = window.innerWidth;
            let iterator = 0;
            for (const menuElement of obj) {
                menuElement.addEventListener('click' , (event) => {
                    let windowWidth = window.innerWidth;
                    // check if the menu is web page state
                    if(windowWidth <= 750) { 
                        toggleLines(lines , showup ? false : true)
                        toggleMenuItems(obj , showup ? false : true)
                    }
                })
                menuElement.animate( 
                    windowSize >600 ? 
                        menuItemsFrames[iterator] :
                        menuItemsFrames2[iterator]
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