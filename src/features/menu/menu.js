import { View } from './view.js';
import { Model } from './model.js';
import { Setting } from './setting.js';
// page
import { Mixology } from '../mixology/mixology.js';
import {Cabinet} from '../cabinet/cabinet.js';
import { Articles } from '../articles/articles.js';

import Form from '../form/form.js';
export class Menu {
    constructor (root, updateUser) {
        this.updateUserStatus = updateUser;
        this.root = root;
        this.Setting = Setting;
        this.View = View;
        this.Model = Model;
        this.Form = new Form(this.root, updateUser );
        // page
    }

    getMenu(userStatus){
        // the functions of initialization after getting new content 
        const useMixology = Mixology.init;
        const useCabinet  = Cabinet.init;
        const useArticles = Articles.init;
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
                    menuHandler( e , useMixology , this.root );
                    updateMenuState(  {path : 'mixology'} );
                }
            }
        };
        const articles = { 
            ...this.Setting.article,
            handler :{
                click : (e) => {
                    menuHandler(e , useArticles , this.root);
                    updateMenuState(  {path : 'articles'});
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
                        updateMenuState(  {path : 'registration'} )
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
                    click : (event) => {
                        event.preventDefault();  
                        personalCabHandler(event , useCabinet , this.root)
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

    