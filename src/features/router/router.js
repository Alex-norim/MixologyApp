// @ts-nocheck
import { Mixology } from '../mixology/mixology.js';
import { Cabinet  } from '../cabinet/cabinet.js';
import { Articles } from '../articles/articles.js';
import { Home } from '../home/home.js';
import { Menu } from '../menu/menu.js';
class Router {
    /**
     * @param {HTMLDivElement} root
     * 
     */
    constructor(root){
        /** 
         * @param {string} lastURL
        */
        
        
        this.root = root;
        this.bodyContentID = 'body-content';
        this.lastURL = '/';
        this.RouterPath = {
            '/' : Home,
            '/home' : Home ,
            '/articles' : Articles,
            '/mixology' : Mixology,
            '/auth/personalCabinet'  : Cabinet,
        }
        this.pageHandler = (e) => {
            e.preventDefault();
            const bodyContent = this.root.querySelector(`#body-content`);
            bodyContent.innerHTML = '';
            const path = e.state ? e.state.path : '/';
            const html = e.state ? e.state.html : 'should add save dom';
            // console.log(html)
            bodyContent.innerHTML = html;
            console.log(path)
            this.RouterPath[path].init(e , this.root);
        }
        window.onpopstate = this.pageHandler;
        
    }
    /**
     * @param {string | URL} url
     * @param {any} text
     */
    saveState( url , text){
        const match = url === this.lastURL;
        if(match && this.lastURL !== '/'){
            console.log('equals')
            window.history.replaceState({

            } ,'',url)
        }else{
            console.log('not wquals')
            window.history.pushState({
                path : url,
                html : text
            }, '' , url);
        }
        this.lastURL = url;
    }
}

export default Router;