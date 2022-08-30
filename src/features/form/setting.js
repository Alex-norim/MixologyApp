export const Elements = {
    login : {   
        tagname : 'input' , 
        attr : {
            class : 'form-text form-element' ,
            type:"text",
            name:"login",
            placeholder : "enter login",
            id : "login"
        }
    } ,
    name :{
        tagname :'input' ,
        attr : {
            class : 'form-text form-element',
            type:"text",
            name:"name",
            placeholder : "enter name",
            id : "name"
        }
    },
    password : {
        tagname :'input' , 
        attr :  {
            class : 'form-text form-element',
            type : "password", 
            name: "password", 
            id: "password", 
            placeholder: "enter password"
        }
    } ,
    confirmPassword : {
        tagname :'input' , 
        attr :  {
            class : 'form-text form-element',
            type : "password", 
            name: "confirmPassword", 
            id: "confirmPassword", 
            placeholder: "confirm password"
        }
    } ,
    email : {
        tagname :'input' , 
        attr :  {
            class : 'form-text form-element',
            type : "email", 
            name: "email", 
            id: "email", 
            placeholder: "enter email"
        }
    },
    errorMessage : {
        tagname : 'p' ,
        attr : {
            class : "error-message",
        }
    },
    submitButton : {
        tagname : 'submit' ,
        attr : {
            class : "form-button form-element",
            type:"submit", 
            value:"Log in",
        }
    },
    signInTitle : {
        tagname : 'h3' ,
        attr : {
            class : 'deftitle' ,
        },
        content : "Sign in"
    },
    signUpTitle : {
        tagname : 'h3' ,
        attr : {
            class : 'deftitle' ,
        },
        content : "Sign up"
    },
    submitButton : {
        tagname : 'input' ,
        attr : {
            class:"form-button form-element", 
            type:"submit", 
            value:"Log in"
        }
    },
    nextButton : {
        tagname : 'div' ,
        attr : {
            class : 'form-button form-button__nextButton'
        },
        content : 'Next'
    },
    prevButton : {
        tagname : 'div' ,
        attr : {
            class : 'form-button form-button__prevButton'
        },
        content : 'Back'
    },
    closeFormButton : {
        tagname : 'div' ,
        attr : {
            class : 'closeFormButton'
        },
        content : "<div class='line'></div><div class='line'></div>"
    },
    signUpFormGetter : {
        tagname : 'a' ,
        attr : {
            class : 'getRegistrationForm',
            href : "#" 
        },
        content : "I don't have account"
    },
    subscribe : {
        tagname : 'div' ,
        attr : {
            class : 'subscribe-wrap'
        },
        content : `<input class="orm-checkbox" type="checkbox" name="subscribe" id="subscribe">` +
                    `<label class="form-label" for="subscribe" >Subscribe to the news</label>`
    }
}