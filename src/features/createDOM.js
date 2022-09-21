// images
import hookahImage from "../public/svg/hookah.svg";
import { createElement } from "./appSettings/commonFunctions";
export default class CreateDom{
    constructor(root){
        this._root = root;
    }
    logotype(){
        let logoText = `<span class="logo-name">Mixology</span>`;
        let logo = new createElement({
            tagname :'div',
            attr : {
                class : 'logotype-wrapper'
            },
            content : hookahImage + logoText
        });
        
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
        let authorText = new createElement({ 
            tagname :'p', 
            attr: {
                class:'designed_by'
            } , 
            content: "designed by Alexej Malekov",
        });
            
        footer.append(
            this.logotype(),
            authorText
        )
    }

}