import createElement from "../appSettings/createElement";
export const View = {
    // requred items is array of objects , for instance 
    // [{tagname : div , attr : {type : text} , content is optional , listeners is optional }]
    getForm : ( requredItems) => {
        // if lastArrayItem is false then getForm returns array of dom elements (it returns signup form)
        // else lastArrayItem is obj  then it return dom element (it returns signin form)
        const lastArrayItem = requredItems.pop();
        if( lastArrayItem === false ) {
            let arr = [];
            requredItems.forEach( elementProps => {
                let item = new createElement(elementProps);
                arr.push(item)
            });
            return arr;
        }else{
            const formWrap = new createElement({
                tagname : 'div' ,
                attr : {
                    class : "defbox signInWrap",
                }
            });
            const form = new createElement({
                ...lastArrayItem,
                attr : {
                    class : "form sign-in",
                    action : "/auth/signin",
                    method : 'POST' 
                }
            });

            // go through the array
            requredItems.forEach( elementProps => {
                let newItem = new createElement(elementProps);
                form.append(newItem);
            });

            formWrap.append(form);
            return formWrap;
        }
        
    },
}

