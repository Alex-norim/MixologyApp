export default function Validator (value , type) {
    let errorLog = {};
    let specificValidator;
    // add some check function for common validation cases
    let commonValidatorsList = {
        trimHtmlTags : (value) => { 
            let oldValue = value;
            let newValue = value.replace( /<.*?>/g ,'');
            (oldValue !== newValue) ? errorLog.error = "has invalid characters" : '';
        },
        emptySpace : (value) => {
            let oldValue = value;
            let newValue = value.replace( /\s/g , '');
            (oldValue !== newValue) ? errorLog.error = "has empty space" : ''
        }
    }
    // in specific cases use switch case construction
    switch (type) {
        case 'login'   :
        case 'name'    :
        case 'password':
        case 'text'    :
            specificValidator = {
                ...commonValidatorsList,
                length : (value) => {
                    ( value.length === 0  )  ? errorLog.error = "can not be empty"
                    : ( value.length < 6  )  ? errorLog.error = "too short" 
                    : ( value.length > 20 )  ? errorLog.error = "too long" : '';
                },
                trimInvalidCharacters : (value) => { 
                    let oldValue = value;
                    let newValue = value.replace( /\W/g , '');
                    (oldValue !== newValue) ? errorLog.error = "has invalid characters" : '';
                },
            };
            break;
        case 'email':
            specificValidator = {
                ...commonValidatorsList,
                hasAmpersand : (value) => {
                    let regex = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
                    ( !regex.test(value) ) ? errorLog.error = 'is invalid' : '';
                }
            };
            // check the error log should be empty
    }
    for (const key in specificValidator) {
        specificValidator[key](value);
        if( errorLog.error ){  
            return errorLog 
        }
        
    }
    return value;
};