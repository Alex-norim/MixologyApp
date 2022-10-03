// @ts-nocheck
import { createElement } from "../appSettings/commonFunctions";
import hookahImage from "../../public/svg/hookah.svg";
const Footer = {
    init : (root) => {
        const Root = root;
        const tagFooter = Root.querySelector('footer');
        const Logo = new createElement({
            tagname :'div',
            attr : {
                class : 'logotype-wrapper'
            },
            content : hookahImage + `<span class="logo-name">Mixology</span>`
        });
        const authorText = new createElement({ 
            tagname :'p', 
            attr: {
                class:'designed_by'
            } , 
            content: "designed by Alexej Malekov",
        });
        tagFooter.append(Logo,authorText);
        
    }
}

export default Footer;