import CreateDom from './createDOM';
import { Menu } from './menu/menu';
import scrollBar from './scrollBar/scrollBar';
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
    }
    init(){
        this._createDOM.header(this.MainMenu);
        // 
        this._createDOM.footer();
        // scrollbar
        scrollBar.init()
    }
}

let app = new App(document.getElementById('root'));
app.init();
