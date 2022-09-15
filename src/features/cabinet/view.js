import {createElement} from "../appSettings/commonFunctions";
import { View as importedView } from "../mixology/view";

export const View = {
    drawModalWindow : (text , acceptFunc , rejectFunc) => {
        let acceptBtn = new createElement({
            tagname : 'button' ,
            attr : {
                class : 'button'
            },
            content : 'accept',
            handler : {
                click : acceptFunc
            }
        });
        let rejectBtn = new createElement({
            tagname : 'button' ,
            attr : {
                class : 'button'
            },
            content : 'reject',
            handler : {
                click : rejectFunc
            }
        });
        let title = new createElement({
            tagname : 'span' ,
            attr : {
                class : 'modalWindowTitle'
            },
            content : text,
        });
        let modalWindow = new createElement({
            tagname : 'div' ,
            attr : {
                class : 'modalWindow'
            },
        });
            modalWindow.append( title , acceptBtn , rejectBtn)
        let modalWindowWrap = new createElement({
            tagname : 'div' ,
            attr : {
                class : 'modalWindowWrap'
            },
            content : '',
        });
            modalWindowWrap.append(modalWindow);
        return modalWindowWrap;
    },
    drawRecipeList : importedView.drawRecipeList,
}