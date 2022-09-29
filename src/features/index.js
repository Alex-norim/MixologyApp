import CreateDom from './createDOM';
import { Menu } from './menu/menu';
import scrollBar from './scrollBar/scrollBar';

//
import { Mixology } from './mixology/mixology';
import { Cabinet  } from './cabinet/cabinet.js';
import { Articles } from './articles/articles.js';
import { Home } from './home/home.js';
// style
import '../public/css/style.css';
class App{
    // readonly root: HTMLElement;
    // _createDOM:any;
    // MainMenu:any;
    // scrollBar:HTMLDivElement;
    constructor( initElement){
        // -----------
        this.root = initElement; 
        this._createDOM = new CreateDom(this.root);
        this.MainMenu = new Menu( this.root );
        this.generalLayout = async () => {
            const currentUrl = sessionStorage.getItem('url').slice(1);
            return await fetch('/' , {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify( {pattern : currentUrl})
            })
        }
    
    }
    init(){
        this._createDOM.header(this.MainMenu);
        // 
        this._createDOM.footer();
        // scrollbar
        scrollBar.init()
        
        window.onload = (e) => {
            const RouterPath = {
                '/' : Home,
                '/home' : Home ,
                '/articles' : Articles,
                '/mixology' : Mixology,
                '/auth/personalCabinet'  : Cabinet,
            }
            const currentURL = window.location.pathname;
            currentURL !== '/' ? 
                RouterPath[currentURL].init(e , this.root) : '';
        }
    }
}


const app = new App(document.querySelector('#root'));
app.init();