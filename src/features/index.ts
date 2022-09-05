import CreateDom from './createDOM.js';
import { Menu } from './menu/menu.js';
import scrollBar from './scrollBar/scrollBar.js';
// style
import '../public/css/style.css';
interface CreateDOM {
    
}
class App{
    readonly root: HTMLElement;
    _createDOM:any;
    MainMenu:any;
    constructor( initElement: HTMLElement){
        // -----------
        this.root = initElement; 
        // _createDom will be removed
        this._createDOM = new CreateDom(this.root);
        this.MainMenu = new Menu( this.root );
    }
    public init():void{
        this._createDOM.header(this.MainMenu);
        // 
        this._createDOM.footer();
        // scrollbar
        scrollBar.init()
    }
}
let app = new App(document.getElementById('root'));

app.init();
