
import {Elements} from './setting.js';
import {Model} from "./model.js";
import {View} from "./view.js";
export default class Form {
    // type defines whether this form for logIn or signUp
    constructor ( root , updateUser){
        this.updateUserStatus = updateUser;
        this.savedDom = {};
        this.currentFieldData = {
            login : {}
        };
        this.root = root ;
        this._view = View;
        this._model = Model;
        let someObj = { data : 'test getter'}
    }
    signUp (event , fieldOrder = 1 ) {
        let formWrap = event.currentTarget.parentNode.parentNode ;
        const form = event.currentTarget.parentNode;
        // handlers
        const clearCurrentFieldData = this._model.clearUserCredentials.bind(this);
        const errorHandler  = this._model.formErrorHandler;
        const closeForm     = this._model.closeForm.bind(this);
        const signUpHandler = this._model.signUpFormHandler.bind(this);
        const saveUserInput = this._model.saveUserInput.bind(this);
        // 
        let newForm = form.cloneNode(false);
            newForm.action = "/registration/signup";
            newForm.addEventListener('submit' , signUpHandler)
            formWrap.innerHTML = '';
        const setting = Elements;
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
                false
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
                false
            ] ,
            3 : [
                setting.signUpTitle ,
                setting.subscribe,
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
                false
            ]
        }; 
        const formItems = this._view.getForm( fields[fieldOrder] ) ;
        formItems.forEach( el => {
            newForm.append(el);
        } )
        formWrap.append(newForm)
    }
    signIn () {
        // ==============
        let formEl = Elements;
        let saveUserInput = this._model.saveUserInput.bind(this);
        const clearCurrentFieldData = this._model.clearUserCredentials.bind(this);
        const closeFormFoo  = this._model.closeForm.bind(this);
        const errorHandler  = this._model.formErrorHandler;
        const formHandler   = this._model.signInFormHandler.bind(this);
        const moveForm = this._model.moveDom;
        const requredItems = [
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
                ...formEl.form ,
                handler : {
                    submit : (e) => {
                        formHandler(e , this.updateUserStatus )
                    }
                }
            }
        ]
        const Form = this._view.getForm( requredItems ) ;
        const forcedForm = this._model.bindMover( Form );
        this.root.append(forcedForm)
    }
    getSomething(){
        return someObj;
    }
}
