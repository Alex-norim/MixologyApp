
import CreateDom from './createDOM.js';
import { Menu } from './menu/menu.js';
import scrollBar from './scrollBar/scrollBar.js';
// style
import '../public/css/style.css';
class App{
    constructor(initElement){
        this.USER = {
            isLogged : false ,
            path : 'home'
        };
        this.updateUserStatus = function ( objState ) {
            let key = Object.keys(objState)[0];
            let val = Object.values(objState)[0];
            // console.log(key , val)
            this.USER[key] = val;
            this.init();
        }
        // ------------
        this.root = initElement; 
        this.pendingAnimation = '<div class="pendingWrapper"><div class="pendingAnimation"></div></div>';


        // _createDom will be removed
        this._createDOM = new CreateDom(this.root);
        this.MainMenu = new Menu(
            this.root , 
            this.updateUserStatus.bind(this) 
        );
    }
    init(){
        let pagePath = this.USER.path;
        let isUserLogged = this.USER.isLogged || localStorage.getItem('name') ;
        this._createDOM.header();
        // 
        this.root.getElementsByClassName('header')[0].append( this.MainMenu.getMenu( {isLogged : isUserLogged } ) );
        // 
        this._createDOM.footer();
        // scrollbar
        scrollBar.init()
    }
}
let app = new App(document.getElementById('root'));

app.init();
