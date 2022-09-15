import { createElement } from "../appSettings/commonFunctions";
export const View = {
    // requred items is array of objects , for instance 
    // [{tagname : div , attr : {type : text} , content is optional , listeners is optional }]
    getForm : ( requredItems ) => {
        // enable type states are 'signin' and 'signup'
        const formSettings = requredItems.pop();
        const form = new createElement(formSettings);
        // go through the array
        requredItems.forEach( elementProps => {
            let newItem = new createElement(elementProps);
            form.append(newItem);
        });
        return form;
    },
}

