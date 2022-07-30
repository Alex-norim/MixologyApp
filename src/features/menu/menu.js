import { View } from './view.js';
import { Model } from './model.js';
import { Setting } from './setting.js';

export class Menu {
    constructor () {

    }

    getMenu(state){
        let isState = state.isLogged;

    }
}
let ul = this.newDom('ul' ,'menu-main');
        for (const key in links) {
            let innerContent = key;
            let link = links[key];
            let a = null;
            innerContent === "Sign in" ?
                a = this.newDom(
                        'a' , 
                        [`menu-main-link` , `${link.slice(1)}`] , 
                        {href : '#'},
                        innerContent
                        ) :
                a = this.newDom(
                    'a' , 
                    [`menu-main-link` , `${link.slice(1)}`] , 
                    {'href' : link },
                    innerContent
                    )
            ul.appendChild(a);
        }
        let clickHumburgerMenu = (event) => {
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
            
        }
        // --------------
        let smallScreenContent = '<div class="line"></div><div class="line"></div><div class="line"></div>';
        let smallScreenBtn = this.newDom('div' ,'smallScreenButton' , false , smallScreenContent );
            smallScreenBtn.addEventListener('click' , clickHumburgerMenu)
        let menu = this.newDom('nav' ,'mainMenuWrap');
            menu.append( smallScreenBtn , ul );

        return menu;
    