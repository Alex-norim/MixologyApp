
import CreateDom from './createDOM.js';
import { Menu } from './menu/menu.js';
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

        this._createDOM = new CreateDom(this.root);
        this.MainMenu = new Menu(
            this.root , 
            this.updateUserStatus.bind(this) 
        );
    }
    // methods 
    // tabaco
    hangHandlerOnTabacoMenu (){
        // getting single item
        let parent              = this.root.getElementsByClassName('tabacoID')[0];
        console.log(parent)
        let contentPlace        = parent.getElementsByClassName('tabacoHistoryID')[0];
        // getting multiply items
        let tabacoMenuItem      = parent.getElementsByClassName('menu-main-link');
        
        // getting of data
        let getData = async (event) => {
            let URL = event.target.getAttribute('data-link');
            //animation of waiting
            contentPlace.innerHTML = this.pendingAnimation;
            let data = await fetch(URL , {method: 'GET'}).then( result => {
                return result.json();
            }).catch(err => {
                console.log('errrrrrr')
            });
            contentPlace.innerHTML = '';
            contentPlace.innerHTML = data.res;
        }

        for (const item of tabacoMenuItem) {
            item.addEventListener('click' , getData)
        }

    }
    init(){
        let pagePath = this.USER.path;
        let isUserLogged = this.USER.isLogged || localStorage.getItem('name') ;
        this._createDOM.header();
        // 
        this.root.getElementsByClassName('header')[0].append( this.MainMenu.getMenu( {isLogged : isUserLogged } ) );
        // 
        this._createDOM.footer();
    }
}
let app = new App(document.getElementById('root'));

app.init();
