import MenuAnimation from "./animation";
export const Model = {
    updateState : function( newState ){
        this.menuState.path = newState;
    },
    renderServerResponse :async function (event , currentHandler , root ) {
        event.preventDefault();
        // 1---> to hide menu
        const menuWrap = event.currentTarget.parentNode;
            menuWrap.removeAttribute('style')
        // <-- to hide menu
        const clearbackground = (element) => {
            const allMenuItems = element.parentNode.querySelectorAll('a');
            for (const iterator of allMenuItems) {
                iterator.removeAttribute('style');
            }
        }
        clearbackground(event.target);
        const background = "rgb(79 79 79)";
        event.target.style.backgroundColor = background;

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
            currentHandler && root ? currentHandler(event , root) : `` ;
        })
        .catch( err => {
            throw err;
        })
    }, 
    mobileMenuHandler : (event) => {
        const menuWrap = event.currentTarget.parentNode;
        // toggle funcs use this var to define time till hide items
        let menuListItems = menuWrap.querySelectorAll('.menu-main-link');
        let menuLines = menuWrap.querySelectorAll('.line');
        let displayStatus =  menuWrap.style.display;
        const menuLineFrames = [
            [{transform: 'rotate(0deg)' , marginTop: 0} , {transform: 'rotate(45deg)' , marginTop: '17px'}] ,
            [{transform: 'rotate(0deg)' ,display: 'block' , left : 0 , width : "100%"} , {transform: "rotate(360deg)", left : "50%" , width: 0}] ,
            [{transform: "rotate(0deg)", marginBottom: "1px"} , {transform: 'rotate(-45deg)' , marginBottom: '20px' }] 
        ];
        let menuItemsFrames = [
            [{top : "42px" } , {top : "42px" } ],
            [{top : "42px" } , {top : '84px' } ],
            [{top : "42px" } , {top : '126px'} ],
            [{top : "42px" } , {top : '168px'} ]
        ];
        const ManageMenuItems = new MenuAnimation(menuItemsFrames , menuListItems);
        const ManageMenuLines = new MenuAnimation(menuLineFrames , menuLines);
        const closeAfterClick = () => {
            ManageMenuLines.animateBack();
        }
        
        menuListItems.forEach(element => {
            element.onclick = closeAfterClick
        })
        if(displayStatus === 'flex'){
            menuWrap.style.display = '';
            ManageMenuItems.animateBack('none');
            ManageMenuLines.animateBack();
        }else if (displayStatus === ''){
            
            ManageMenuItems.animateForward('block')
            ManageMenuLines.animateForward();
            menuWrap.style.display = 'flex';
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