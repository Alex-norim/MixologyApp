
// import protoClass

import Protos from "./prototype";
// images
import likeImage from "../public/svg/like.svg";
import hookahImage from "../public/svg/hookah.svg";
import Validator from "../features/validator.js";


let color = '#ffffff';
let defColor = '#938f8f'
export default class CreateDom extends Protos {
    constructor(root){
        super(root)
        this._root = root;
        this.formErrorHandler = (event)=>{
            let errorMessage = this._root.getElementsByClassName('error-message')[0];
            let target = event.target;
            let value  = target.value; 
            let inputType = target.attributes.type.value.toString();
            const initValidator = new Validator(value , inputType);
            const isValidData = initValidator.getErrors()[0];
            
            if(typeof isValidData === 'object') {
                errorMessage.textContent = isValidData.error;
                target.style.color = 'red'
                errorMessage.style.color = 'red';
            }else {
                target.style.color = ''
                target.style.color = '';
                errorMessage.textContent = '';
            }      
        }
    }
    logotype(){
        let logoText = `<span class="logo-name">Mixology</span>`;
        let logo = this.newDom('div' ,'logotype-wrapper' , false , hookahImage + logoText) 
        
        return logo;
    }
    mainMenu(){
        let ul = this.newDom('ul' ,'menu-main');
        let links =  {
            "home"     : "/home" ,
            "mixology" : "/mixology",
            "brands"   : "/tabaco",
            "Sign in"  : "/registration",
        }
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
    }
    header(menu){
        
        let header = this._root.querySelector('.header');
        header.innerHTML = '';

        header.append(
            this.logotype() ,
            menu
        )
    }
    footer(){
        let footer = this._root.querySelector('.footer')
        footer.innerHTML = '';
        let authorText = this.newDom('p', 'designed_by' , false, "designed by Alexej Malekov");
            
        footer.append(
            this.logotype(),
            authorText
        )
    }

}