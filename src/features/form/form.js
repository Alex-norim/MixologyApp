
import {Elements} from './setting.js';
import {Model} from "./model.js";
import {View} from "./view.js";
import { Menu } from '../menu/menu.js';
import createElement from '../appSettings/createElement.js';
export default class Form {
    // type defines whether this form for logIn or signUp
    constructor ( root , updateUser){
        this.updateUserStatus = updateUser;
        this.savedDom = {};
        this.currentFieldData = {
            login : {},
            subscribe : 0
        };
        this.root = root ;
        this._view = View;
        this._model = Model;
    }
    signUp (event , fieldOrder = 1 ) {
        const formWrap = event.currentTarget.parentNode.parentNode ;
            formWrap.innerHTML = '';
        const setting = Elements;
        // handlers
        const InputFiller = this._model.fillInputs;
        const checkSubscribe = this._model.checkSubscribe.bind(this);
        const clearCurrentFieldData = this._model.clearUserCredentials.bind(this);
        const errorHandler  = this._model.formErrorHandler;
        const closeForm     = this._model.closeForm.bind(this);
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
        }
        // last element of the fields const should be false to prevent wrap rendering
        const fields = {
            1 : [
                setting.signUpTitle ,
                {...setting.login ,
                    handler : {
                        keyup : (e) => { 
                            saveUserInput(e);
                            errorHandler(e)
                        },
                    }
                },
                {...setting.name ,
                    handler : {
                        keyup : (e) => { 
                            saveUserInput(e);
                            errorHandler(e)
                        },
                    }
                } ,
                {
                    ...setting.email ,
                    handler : {
                        keyup : (e) => { 
                            saveUserInput(e);
                            errorHandler(e)
                        },
                    }
                },
                setting.errorMessage,
                {
                    ...setting.nextButton,
                    handler : {
                        click : (event) => {
                            this.signUp(event , fieldOrder + 1 )
                        }
                    }
                },
                {
                    ...setting.closeFormButton,
                    handler : {
                        click : (e) => {
                            closeForm(e) ;
                            clearCurrentFieldData(e);
                        },
                    }
                },
                signUpForm
            ] ,
            2 : [
                setting.signUpTitle ,
                {
                    ...setting.password,
                    handler : {
                        keyup : (e) => { 
                            saveUserInput(e);
                            errorHandler(e)
                        },
                    }
                },
                {
                    ...setting.confirmPassword,
                    handler : {
                        keyup : (e) => { 
                            saveUserInput(e);
                            errorHandler(e)
                        },
                    }
                },
                setting.errorMessage,
                {
                    ...setting.prevButton,
                    handler : {
                        click : (event) => {
                            this.signUp(event , fieldOrder - 1 )
                        },
                    },
                },
                {
                    ...setting.nextButton,
                    handler : {
                        click : (event) => {
                            this.signUp(event , fieldOrder + 1 )
                        }
                    }
                },
                {
                    ...setting.closeFormButton,
                    handler : {
                        click : (e) => {
                            closeForm(e) ;
                            clearCurrentFieldData(e);
                        },
                    }
                },
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
                {
                    ...setting.submitButton,
                },
                {
                    ...setting.closeFormButton,
                    handler : {
                        click : (e) => {
                            closeForm(e) ;
                            clearCurrentFieldData(e);
                        },
                    }
                },
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
        const closeFormFoo  = this._model.closeForm.bind(this);
        const errorHandler  = this._model.formErrorHandler;
        const formHandler   = this._model.signInFormHandler.bind(this);
        const redrawnMenu    = new Menu(root , ()=> {}).getMenu({isLogged : true});
        const BindMover = this._model.bindMover;
        const signInWrap = new createElement({
            tagname : 'div' ,
            attr : {
                class : "defbox signInWrap",
            },
            handler : (e) => {

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
                        closeFormFoo(e) ;
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
                        formHandler(e , redrawnMenu , this.root )
                    }
                }
            }
        ];
        // getForm method returns dom element ; 
        const Form = this._view.getForm( formItems ) ;
        signInWrap.append(Form)
        const MoveableWrap = BindMover(signInWrap);
        this.root.append(MoveableWrap);
    }
}
