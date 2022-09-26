import { Mixology } from '../mixology/mixology.js';
import { Cabinet  } from '../cabinet/cabinet.js';
import { Articles } from '../articles/articles.js';
import { Home } from '../home/home.js';
import { Menu } from '../menu/menu.js';
class Router {
    constructor(root){
        this.root = root;
        this.bodyContentID = 'body-content';
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
            console.log(e.state)
            const path = e.state ? e.state.path : '/';
            const html = e.state ? e.state.html : 'should add save dom';
            console.log(path)
            bodyContent.innerHTML = html
            this.RouterPath[path].init(e , this.root);
        }
        this.generalLayout = fetch('/' , {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify( {pattern : 'home'})
        })
        window.onpopstate = this.pageHandler;
        window.onbeforeunload = (e) => {
            const pattern = sessionStorage.getItem('pattern');

            if(!pattern){
                this.generalLayout
                .then(result => {
                    return result.text();
                })
                .then(text => {
                    sessionStorage.setItem('pattern' , text)
                })
            }
            
        } 
        window.onpageshow = (e) => {
            const pattern = sessionStorage.getItem('pattern');
            if(pattern){
                const url = sessionStorage.getItem('url');
                const newMenu = new Menu(this.root)
                // console.log(location.origin)
                const initHandler = this.RouterPath[url].init;
                document.body.innerHTML = pattern;
                fetch(url)
                    .then( result => {
                        return result.text();
                    })
                    .then(text => {
                        // console.log(text)
                        const bodyRoot = this.root.querySelector('#body-content');
                        bodyRoot.innerHTML = text;
                        newMenu.initMenu();
                        initHandler();
                        // sessionStorage.clear();
                    })
                console.log('there is expected that pattern has been integrated in dom element')
            }
        }
        
    }
    saveState( url , text){
        
        window.history.pushState({
            path : url,
            html : text
        }, '' , url)
    }
}

export default Router;