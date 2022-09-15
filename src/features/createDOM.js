
// import protoClass

import Protos from "./prototype";
// images
import hookahImage from "../public/svg/hookah.svg";
import Validator from "../features/validator.js";


let color = '#ffffff';
let defColor = '#938f8f'
export default class CreateDom extends Protos {
    constructor(root){
        super(root)
        this._root = root;
    }
    logotype(){
        let logoText = `<span class="logo-name">Mixology</span>`;
        let logo = this.newDom('div' ,'logotype-wrapper' , false , hookahImage + logoText) 
        
        return logo;
    }
    header(menu){
        
        let header = this._root.querySelector('.header');
        header.innerHTML = '';

        header.append(
            this.logotype() ,
        )
        menu.initMenu()
    }
    footer(){
        let footer = this._root.querySelector('.footer')
        footer.innerHTML = '';
        let authorText = this.newDom('p', 'designed_by' , false, "designed by Alexej Malekov");
            
        footer.append(
            this.logotype(),
            authorText
        )
    }

}