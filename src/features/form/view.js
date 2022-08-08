import createElement from "../appSettings/createElement";
export const View = {
    // requred items is array of objects , for instance 
    // [{tagname : div , attr : {type : text} , content is optional , listeners is optional }]
    getForm : ( requredItems , formType = true ) => {
        let currentWrapClass = (formType) ? ' signInWrap' : ' signUpWrap';
        let currentFormClass = (formType) ? ' sign-in'    : ' sign-up';
        let currentAction    = (formType) ? 'signin'      : 'signup';
        let currentmethod    = (formType) ? 'POST'        : 'GET';
        const wrapProps = {
            tagname : 'div' ,
            attr : {
                class : "defbox" + currentWrapClass,
            }
        };
        const lastArrayItem = requredItems.pop();
        
        if( lastArrayItem === false ) {
            let arr = [];
            requredItems.forEach( elementProps => {
                let item = new createElement(elementProps);
                arr.push(item)
            });
            return arr;
        }else{
            const formProps = {
                ...lastArrayItem,
                attr : {
                    class : "form" + currentFormClass ,
                    action : "/auth/" + currentAction ,
                    method : currentmethod 
                }
            }
            const form = new createElement(formProps);

            // go through the array
            requredItems.forEach( elementProps => {
                let newItem = new createElement(elementProps);
                form.append(newItem);
            });
            const formWrap = new createElement(wrapProps);
            formWrap.append(form);
            return formWrap;
        }
        
    },
}

