export default class Validator {
    constructor(value , checkBy) {
        this.checkBy = checkBy;
        this.value = value;
        this.errorLog = true;
        this.Handlers = {
            length : Length ,
            emptySpace : EmptySpace ,
            trimInvalidChar : TrimInvalidChar ,
            trimHtmlTags : TrimHtmlTags ,
            checksAmpersand : ChecksAmpersand
        };
        this.handle(); 
    }
    handle () {
        for (const key in this.checkBy) {
            if (this.Handlers.hasOwnProperty(key)) {
                const currentHandler = new this.Handlers[key](this.value);
                const result = currentHandler.Log;
                typeof result === 'object' ? 
                    this.errorLog = result : true

            }
        }   
    }
    getErrors () {
        return ErrorLogger.getOnlyErrors(this); 
    }
    
};
const ErrorLogger = {
    updateErrorLog : ( _this , key , result ) => {
        let __this = _this;
        __this.errorLog[ key ] = result;
    },
    getOriginLog : (_this) => {
        return _this.errorLog;
    } ,
    getOnlyErrors : (_this) => {
        const Log = _this.errorLog;
        return Object.values( Log ).filter( (value ) => {
            return typeof value === 'object' ? value : `` ;
        })
    }
    
}
class Length {
    minLength = 4;
    maxLength = 30;
    Log = null ;
    constructor (value) {
        this.value = value;
        this.Handler = (value) => {
            if( value.length === 0){
                return {error : "can not be empty"};
            }else if(value.length < this.minLength){
                return {error : "too short"};
            }else if(value.length > this.maxLength){
                return {error : "too long"};
            }else{
                return true;
            }
        }
        this.process();
    }
    process(){
        this.Log = this.Handler(this.value,this.checkBy);
    }
}
class TrimHtmlTags {
    Errorname = "has invalid characters" ;
    Log = null ;
    constructor (value) {
        this.value = value;
        this.Handler = (value) => {
            return value === value.replace(/<.*?>/g, '') ? 
                true : {error : this.Errorname}
        }
        this.process();
    }
    process(){
        this.Log = this.Handler(this.value,this.checkBy);
    }
} 
class EmptySpace {
    Errorname = "has empty space";
    Log = null ;
    constructor (value){
        this.value = value;
        this.Handler = (value) => {
            return value === value.replace(/\s/g, '')?
                true : { error : this.Errorname };
        }
        this.process();
    }
    process(){
        this.Log = this.Handler(this.value);
    }
}
class TrimInvalidChar {
    Errorname = "has invalid characters";
    Log = null ;
    constructor(value){
        this.value = value;
        this.Handler = (value) => {
            return value === value.replace(/[^A-Za-z0-9]/g , '|' ) ? 
                true : {error : this.Errorname }
        };
        this.process();
    }
    process(){
        this.Log = this.Handler(this.value);
    }
}
class ChecksAmpersand {

    Errorname = 'Invalid email';
    Log = null ;
    constructor(value){
        this.value = value;
        this.Handler = (value) => {
            const regex = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
            if (regex.test(value)) {
                return true;
            }else{
                return {error : this.Errorname};
            }
        }
        this.process();
    }
    process(){
        this.Log = this.Handler(this.value,this.checkBy);
    }
}