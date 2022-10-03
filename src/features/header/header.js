// @ts-nocheck
import { createElement } from "../appSettings/commonFunctions";
import hookahImage from "../../public/svg/hookah.svg";
const Header = {
    init : (root , menu) => {
        const Root = root;
        const tagHeader = Root.querySelector('header');
        const Logo = new createElement({
            tagname :'div',
            attr : {
                class : 'logotype-wrapper'
            },
            content : hookahImage + `<span class="logo-name">Mixology</span>`
        });
        tagHeader.append(Logo);
        menu.initMenu();
    }
}

export default Header;