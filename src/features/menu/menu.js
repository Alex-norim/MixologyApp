import { View } from './view';
import { Model } from './model.js';
import { Setting } from './setting.js';
// page
import { Mixology } from '../mixology/mixology.js';
import { Cabinet  } from '../cabinet/cabinet.js';
import { Articles } from '../articles/articles.js';

import Form from '../form/form.js';
export class Menu {
    constructor (root) {
        this.root = root;
        this.Setting = Setting;
        this.View = View;
        this.Model = Model;
        this.Form = new Form(this.root);
    }

    initMenu(){
        // the functions of initialization after getting new content 
        const Header = this.root.querySelector('header');
        const menu = Header.querySelector('.mainMenuWrap');
        if(menu){
            menu.remove();
        }
        const useMixology = Mixology.init;
        const useCabinet  = Cabinet.init;
        const useArticles = Articles.init;
        const mobileMenuHandler = this.Model.mobileMenuHandler;
        // menu items handler
        // menuHandler is processing a response that gets html file 
        const menuHandler = this.Model.renderServerResponse.bind(this);
        //check whether the user has logged
        const authStatus = Model.getUserServerStatus();

        const home = { 
            ...this.Setting.home,
            handler : {
                click : (e) => {
                    menuHandler(e);
                }
            }
        };
        const mixology = { 
            ...this.Setting.mixology,
            handler : {
                click : (e) => {
                    menuHandler( e , useMixology , this.root );
                }
            }
        };
        const articles = { 
            ...this.Setting.article,
            handler :{
                click : (e) => {
                    menuHandler(e , useArticles , this.root);
                }
            }
        };
        const mobileMenu = {
            ...this.Setting.mobileButton,
            handler : {
                click : (e) => {
                    mobileMenuHandler(e , this.root)
                }
            }
        }
        const initMenu = [
            home ,
            mixology ,
            articles,
            { 
                ...this.Setting['Sign in'],
                handler :{
                    click : (event) => {
                        event.preventDefault();  
                        this.Form.signIn(); 
                    }
                }
            } ,
            mobileMenu
        ];
        const authedUserMenu = [
            home ,
            mixology ,
            articles,
            { 
                ...this.Setting.cabinet,
                handler :{
                    click : (e) => {
                        menuHandler(e , useCabinet , this.root);
                    }
                }
            } ,
            mobileMenu
        ];

        authStatus 
            .then( result => {
                const isUserLogged = result.res;
                if(!isUserLogged){
                    Header.append( this.View.drawMenu( initMenu ) );
                }else if(result){
                    Header.append( this.View.drawMenu( authedUserMenu ) );
                }
            })
            .catch(err => {
                Header.append( this.View.drawMenu( initMenu ) );
            })
    }
}

    