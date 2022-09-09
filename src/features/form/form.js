
import {Elements} from './setting.js';
import {Model} from "./model.js";
import {View} from "./view.js";
import createElement from '../appSettings/createElement.js';
export default class Form {
    // type defines whether this form for logIn or signUp
    constructor ( root ){
        this.isFormCreated = false;
        this.currentFieldData = {
            login : {},
            subscribe : 0
        };
        this.root = root ;
        this._view = View;
        this._model = Model;
        this.BindMover = this._model.bindMover;
        this.closeFormFoo  = this._model.closeForm.bind(this);
    }
    signUp (event , fieldOrder = 1 ) {
        // clear sign in form
        const formWrap = event.currentTarget.parentNode.parentNode ;
            formWrap.innerHTML = '';
        const setting = Elements;
        // handlers
        const InputFiller = this._model.fillInputsByValid.bind(this);
        const checkSubscribe = this._model.checkSubscribe.bind(this);
        const clearCurrentFieldData = this._model.clearUserCredentials.bind(this);
        const errorHandler  = this._model.formErrorHandler;
        const signUpHandler = this._model.signUpFormHandler.bind(this);
        const saveUserInput = this._model.saveUserInput.bind(this);
    
        const signUpForm = {
            tagname : 'form',
            attr : {
                class : 'form',
                action : '/auth/signup',
                method : 'POST'
            },
            handler : {
                submit : (e) => {
                    signUpHandler(e)
                }
            }
        };
        const inputHandler = {
            keyup : (e) => { 
                saveUserInput(e);
                errorHandler(e)
            },
        }
        const buttonPrev = {
            ...setting.prevButton,
            handler : {
                click : (event) => {
                    this.signUp(event , fieldOrder - 1 );
                    InputFiller()
                },
            },
        };
        const buttonNext = {
            ...setting.nextButton,
            handler : {
                click : (event) => {
                    this.signUp(event , fieldOrder + 1 );
                    InputFiller()
                }
            }
        };
        const buttonToCloseForm = {
            ...setting.closeFormButton,
            handler : {
                click : (e) => {
                    this.closeFormFoo(e) ;
                    clearCurrentFieldData(e);
                },
            }
        };
        // last element of the fields const should be a wrap element
        const fields = {
            1 : [
                setting.signUpTitle ,
                {...setting.login ,
                    handler : inputHandler
                },
                {...setting.name ,
                    handler : inputHandler
                } ,
                {
                    ...setting.email ,
                    handler : inputHandler
                },
                setting.errorMessage,
                buttonNext,
                buttonToCloseForm,
                signUpForm
            ] ,
            2 : [
                setting.signUpTitle ,
                {
                    ...setting.password,
                    handler : inputHandler
                },
                {
                    ...setting.confirmPassword,
                    handler : inputHandler
                },
                setting.errorMessage,
                buttonPrev,
                buttonNext,
                buttonToCloseForm,
                signUpForm,
            ] ,
            3 : [
                setting.signUpTitle ,
                {
                    ...setting.subscribe,
                    handler : {
                        click : (event) => {
                            checkSubscribe(event);
                        }
                    }
                },
                setting.errorMessage,
                buttonPrev,
                {
                    ...setting.submitButton,
                },
                buttonToCloseForm,
                signUpForm,
            ]
        }; 
        // getForm method returns array of the dom elements
        const SignUpForm = this._view.getForm( fields[fieldOrder] ) ;
        formWrap.append(SignUpForm);
    }
    signIn () {
        let formEl = Elements;
        let saveUserInput = this._model.saveUserInput.bind(this);
        const clearCurrentFieldData = this._model.clearUserCredentials.bind(this);
        const errorHandler  = this._model.formErrorHandler;
        const formHandler   = this._model.signInFormHandler.bind(this);
        const signInWrap = new createElement({
            tagname : 'div' ,
            attr : {
                class : "defbox signInWrap",
            }
        });

        const formItems = [
            formEl.signInTitle ,
            {
                ...formEl.login , 
                handler : { 
                    keyup : (e) => { 
                        saveUserInput(e);
                        errorHandler(e)
                    },
                }
            },
            {
                ...formEl.password ,
                handler : { 
                    keyup : saveUserInput,
                    keydown : errorHandler
                }    
            },
            formEl.errorMessage,
            formEl.submitButton,
            {
                ...formEl.closeFormButton ,
                handler : {
                    click : (e) => {
                        this.closeFormFoo(e) ;
                        clearCurrentFieldData(e);
                    },
                }
            },
            {
                ...formEl.signUpFormGetter ,
                handler: {
                    click : (e) => {
                        this.signUp(e);
                    }
                }
            },
            {
                tagname : 'form' ,
                attr : {
                    method : 'POST',
                    action : '/auth/signin',
                    class : 'form'
                },
                handler : {
                    submit : (e) => {
                        formHandler(e , this.root )
                    }
                }
            }
        ];
        // getForm method returns dom element ; 
        const Form = this._view.getForm( formItems ) ;
        signInWrap.append(Form)
        const MoveableWrap = this.BindMover(signInWrap);
        this.root.append(MoveableWrap);
    }
    offerForm(){
        //handlers
        const getCategory = Model.getCategory();
        const FormHandler = Model.offerFormHandler;
        const formWrapSet = new createElement({
            tagname : 'div' ,
            attr : {
                class : "defbox",
            }
        });
        const formSet = {
            tagname : 'form',
            attr : {
                method : 'POST',
                action : '/auth/recomendnewrecipe',
                class : "form recommendation"
            },
            handler : {
                submit : (e)=>{
                    FormHandler(e);
                }
            }
        }
        getCategory.then( result => {
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
                const reqElements = [
                    Elements.formOfferTitle,
                    {
                        ...Elements.newRecipe,
                    },
                    {
                        tagname : 'select',
                        attr : {
                            class : 'form-select form-element',
                            id : 'flavor',
                            name : 'flavor'
                        },
                        content : FlavorOptions,
                    },
                    {
                        ...Elements.selectStrength
                    },
                    Elements.errorMessage,
                    Elements.submitButton,
                    {
                        ...Elements.closeFormButton,
                        handler : {
                            click : (e) => { 
                                this.closeFormFoo (e)
                            }
                        }
                    },
                    formSet
                ];
                const Form = View.getForm(reqElements);
                formWrapSet.append(Form);
                const moveableWrap = this.BindMover(formWrapSet);
                this.root.append(moveableWrap);
            }

        });
        
    }
}
