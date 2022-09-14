
export const Model = {
    updateState : function( newState ){
        this.menuState.path = newState;
    },
    renderServerResponse : async function (event , currentHandler , root ) {
        event.preventDefault();
        let bodyContent = this.root.getElementsByClassName('body-content')[0];
        let HrefRequest = event.target.getAttribute('href');
        
        await fetch(HrefRequest , {
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
            let iterator = 0;
            for (const menuElement of obj) {
                menuElement.addEventListener('click' , (event) => {
                    let windowWidth = window.innerWidth;
                    // check if the menu is web page state
                    if(windowWidth <= 800) { 
                        root.style.display = '';
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
    getUserServerStatus : () => {
        return new Promise( (resolve , reject) => {
            const req = new XMLHttpRequest();
        
            req.onerror = () => {
                reject(false);
            }
            req.onload = () => {
                let response = req.response;
                resolve(response)
            }
            req.open('GET' ,'/auth/auth_Status');
            req.responseType = 'json'
            // req.setRequestHeader('Content-Type', 'application/json');
            req.send();
        }) 
        
    }
}