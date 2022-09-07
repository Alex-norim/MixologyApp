import createElement from "../appSettings/createElement";
import { View as importedView } from "../mixology/view";
import { Model as importedModel } from "../form/model";

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
    showForm : async(getCategory , FormHandler , Root , makeMoveable , closeForm) => {
        const ErrorHandler = importedModel.formErrorHandler;
        const title = new createElement({
            tagname : 'h2' , 
            attr : {class: "deftitle"},
            content : "Recommend new recipe"
        });
        const formText = new createElement( {
            tagname : 'input' ,
            attr : {
                class : "form-text form-element",
                type : 'text',
                name : 'newrecipe',
                placeholder : "enter your recipe...",
                autocomplete : 'off'
            },
            content : '',
            handler : {
                keyup : ErrorHandler
            },
        })
        const submitButton = new createElement( {
            tagname : 'input',
            attr : {
                class : 'form-button form-element',
                type : 'submit' ,
                value : 'Send'
            }
        })
        const errorMessage = new createElement({
            tagname : 'p',
            attr : {class: "error-message form-element"}
        })
        const Form = new createElement( {
            tagname : 'form',
            attr : {
                method : "POST" ,
                action : "/auth/recomendnewrecipe",
                class : 'form recommendation'
            },
            content : '',
            handler : {
                submit : (e) => {FormHandler(e)}
            }
        })
        const FormWrap = new createElement({
            tagname : 'div' ,
            attr : {
                class : 'defbox'
            }
        });
        const CloseButton = new createElement({
            tagname : 'div',
            attr: {
                class : 'closeFormButton'
            },
            content : '<div class="line"></div><div class="line"></div>',
            handler : {
                click : (e) => { closeForm (e)}
            }
        })
        return await getCategory.then( result => {
            let arr = result.res;
            
            if (arr[0] === false){
                FormWrap.innerHTML = 'Server not found'
                Root.append(FormWrap)
            }else{
                let FlavorOptions = arr.reduce( (prev,curr) => {
                    let previous = prev;
                    let current;
                    if (previous === ''){
                        current = `<option selected value="${curr}">${curr}</option>`
                    }else {
                        current = `<option value="${curr}">${curr}</option>`
                    }
                    return previous + current;
                } , '');
                const SelectFlavor = new createElement({
                    tagname : 'select',
                    attr : {
                        class : 'form-select form-element',
                        id : 'flavor',
                        name : 'flavor'
                    },
                    content : FlavorOptions,
                })
                const SelectStrength = new createElement({
                    tagname : 'select' ,
                    attr : {
                        class : 'form-select form-element',
                        id : 'strength' ,
                        name : 'strength'
                    },
                    content : ( () => {
                        let options = '';
                        for (let i = 0; i <= 10; i++) {
                            options += `<option>${i}</option>`
                        };
                        return options;
                    })()
                })
    
                Form.append(formText , SelectFlavor, SelectStrength , errorMessage , submitButton , CloseButton );
                FormWrap.append(title , Form );
                let moveableWrap = makeMoveable(FormWrap)
                Root.append(moveableWrap);
            }

        });
    }
}