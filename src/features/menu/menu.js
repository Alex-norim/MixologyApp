import { View } from './view.js';
import { Model } from './model.js';
import { Setting } from './setting.js';
// page
import { Mixology } from '../mixology/mixology.js';

import Form from '../form/form.js';
export class Menu {
    constructor (root, updateUser) {
        this.updateUserStatus = updateUser;
        this.root = root;
        this.Setting = Setting;
        this.View = View;
        this.Model = Model;
        this.Form = new Form(this.root, updateUser );
    }

    getMenu(userStatus){
        const useMixology = new Mixology( this.root).init();
        // let isState = state.isLogged;
        const isLogged = userStatus.isLogged;
        const mobileMenuHandler = this.Model.mobileMenuHandler;
        const menuHandler = this.Model.renderServerResponse.bind(this);
        const updateMenuState = this.updateUserStatus;
        // menu items handler
        // const mixologyHandler = this.Model.mixologyHandler.bind(this);
        const personalCabHandler = this.Model.personalCabinet.bind(this);

        const home = { 
            ...this.Setting.home,
            handler : {
                click : (e) => {
                    menuHandler(e);
                    updateMenuState( {path : 'home'} )
                }
            }
        };
        const mixology = { 
            ...this.Setting.mixology,
            handler : {
                click : (e) => {
                    menuHandler( e , useMixology );
                    updateMenuState(  {path : 'mixology'} );
                }
            }
        };
        const brands = { 
            ...this.Setting.brands,
            handler :{
                click : (e) => {
                    menuHandler(e);
                    updateMenuState(  {path : 'brands'});
                }
            }
        };
        const mobileMenu = {
            ...this.Setting.mobileButton,
            handler : {
                click : mobileMenuHandler
            }
        }
        const initMenu = [
            home ,
            mixology ,
            brands,
            { 
                ...this.Setting['Sign in'],
                handler :{
                    click : (event) => {
                        event.preventDefault();  
                        this.Form.signIn(); 
                        updateMenuState(  {path : 'registration'} )
                    }
                }
            } ,
            mobileMenu
        ];
        const authedUserMenu = [
            home ,
            mixology ,
            brands,
            { 
                ...this.Setting.cabinet,
                handler :{
                    click : (event) => {
                        event.preventDefault();  
                        personalCabHandler(event);
                        updateMenuState(  {path : 'personalCab'} )
                    }
                }
            } ,
            mobileMenu
        ];
        
        if(isLogged){
            return this.View.drawMenu( authedUserMenu )
        }else{
            return this.View.drawMenu( initMenu )
        }
        
    }
}
// let ul = this.newDom('ul' ,'menu-main');
//         for (const key in links) {
//             let innerContent = key;
//             let link = links[key];
//             let a = null;
//             innerContent === "Sign in" ?
//                 a = this.newDom(
//                         'a' , 
//                         [`menu-main-link` , `${link.slice(1)}`] , 
//                         {href : '#'},
//                         innerContent
//                         ) :
//                 a = this.newDom(
//                     'a' , 
//                     [`menu-main-link` , `${link.slice(1)}`] , 
//                     {'href' : link },
//                     innerContent
//                     )
//             ul.appendChild(a);
//         }
//         // --------------
//         let smallScreenContent = '<div class="line"></div><div class="line"></div><div class="line"></div>';
//         let smallScreenBtn = this.newDom('div' ,'smallScreenButton' , false , smallScreenContent );
//             smallScreenBtn.addEventListener('click' , clickHumburgerMenu)
//         let menu = this.newDom('nav' ,'mainMenuWrap');
//             menu.append( smallScreenBtn , ul );

//         return menu;
    