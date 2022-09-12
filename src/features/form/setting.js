export const Elements = {
    login : {   
        tagname : 'input' , 
        attr : {
            class : 'form-text form-element' ,
            type:"text",
            name:"login",
            placeholder : "enter login",
            id : "login",
            autocomplete :'username'
        }
    } ,
    name :{
        tagname :'input' ,
        attr : {
            class : 'form-text form-element',
            type:"text",
            name:"name",
            placeholder : "enter name",
            id : "name",
        }
    },
    password : {
        tagname :'input' , 
        attr :  {
            class : 'form-text form-element',
            type : "password", 
            name: "password", 
            id: "password", 
            autocomplete: "current-password",
            placeholder: "enter password"
        }
    } ,
    newPassword : {
        tagname :'input' , 
        attr :  {
            class : 'form-text form-element',
            type : "password", 
            name: "password", 
            id: "password", 
            placeholder: "enter password",
        }
    } ,
    confirmPassword : {
        tagname :'input' , 
        attr :  {
            class : 'form-text form-element',
            type : "password", 
            name: "confirmPassword", 
            id: "confirmPassword", 
            placeholder: "confirm password",
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
    newRecipe : {
        tagname : 'input',
        attr : {
            type:"text", 
            name:"newrecipe", 
            placeholder:"enter your recipe...", 
            autocomplete:"off",
            class : "form-text form-element"
        } 
    },
    selectStrength :{
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
    formOfferTitle: {
        tagname : 'h3' ,
        attr : {
            class : 'deftitle' ,
        },
        content : "Share a recipe"
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
        tagname : 'button' ,
        attr : {
            class : 'form-button form-button__nextButton',
        },
        content : 'Next'
    },
    prevButton : {
        tagname : 'button' ,
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
        content : `<input class="form-checkbox" type="checkbox" name="subscribe" id="subscribe"><label class="form-label" for="subscribe" >Subscribe to the news</label>`
    },
}