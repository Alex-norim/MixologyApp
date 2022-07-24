export default class Validator {
    constructor(value , type) {
        this.value = value;
        this.type  = type;
        this.errorLog = {};
        this.handlers = [
            Length ,
            EmptySpace ,
            TrimInvalidChar ,
            TrimHtmlTags ,
            ChecksAmpersand
        ];
        this.handle(); 
    }
    handle () {
        for (const [index , handler] of this.handlers.entries() ) {
            let key = index ;
            let validator = new handler(this.value , this.type);
                validator.handle()
            let result = validator.getLog();
            ErrorLogger.updateErrorLog(this , key , result)
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
    Types = ['text' , 'password'];
    minLength = 4;
    maxLength = 20;
    Log = null ;
    Errorname = '';
    
    Handler = (value) => {
        if( value.length === 0){
            this.Errorname = "can not be empty";
            return false
        }else if(value.length < this.minLength){
            this.Errorname = "too short";
            return false
        }else if(value.length > this.maxLength){
            this.Errorname = "too long";
            return false
        }
    }
    constructor (value , type) {
        this.value = value;
        this.type  = type;
        this.fitByType = this.Types.includes(this.type);
    }
    handle(){
        if(this.fitByType){
            this.Log = this.Handler(this.value);
        }
    }
    getLog(){
        if(this.Log === false){
            return {error : this.Errorname};
        }
        return true;
    }
}
class TrimHtmlTags {
    Types = ['text' , 'password' , 'email'];
    Errorname = "has invalid characters" ;
    Log = null ;
    Handler = (value) => {
        let oldValue = value;
        let newValue = value.replace(/<.*?>/g, '');
        if(oldValue !== newValue ){
            return false
        } else {
            return true
        }
    }
    constructor (value , type) {
        this.value = value;
        this.type  = type;
        this.fitByType = this.Types.includes(this.type);
    }
    handle(){
        if(this.fitByType){
            this.Log = this.Handler(this.value);
        }
    }
    getLog(){
        if(this.Log === false){
            return {error : this.Errorname};
        }
        return true;
    }
} 
class EmptySpace {
    Types = ['text' , 'password' , 'email'];
    Errorname = "has empty space" ;
    Log = null ;
    Handler = (value) => {
        let oldValue = value;
        let newValue = value.replace(/\s/g, '');
        if(oldValue !== newValue){
            return false
        } else {
            return true
        }
    }
    constructor (value , type ){
        this.value = value;
        this.type  = type;
        this.fitByType = this.Types.includes(this.type);
    }
    handle(){
        if(this.fitByType){
            this.Log = this.Handler(this.value);
        }
    }
    getLog(){
        if(this.Log === false){
            return {error : this.Errorname};
        }
        return true;
    }
}
class TrimInvalidChar {
    Types = ['text' , 'email'];
    Errorname = "has invalid characters";
    Log = null ;
    Handler = (value , type) => {
        let oldValue = value;
        let newValue = (type === 'email') ? value.replace(/[^A-Za-z0-9.@]/g , '|' ) : 
            value.replace(/\W/g, '');
        console.log("new --- " + newValue)
        if(oldValue !== newValue){
            return false
        } else {
            return true
        }
    }
    constructor(value , type){
        this.value = value;
        this.type  = type;
        this.getType = this.Types.includes(this.type);
    }
    handle(){
        if(this.fitByType , this.type){
            this.Log = this.Handler(this.value , this.type);
        }
    }
    getLog(){
        if(this.Log === false){
            return {error : this.Errorname};
        }
        return true;
    }
}
class ChecksAmpersand {
    Types = ['email'];
    Errorname = 'Invalid email';
    Log = null ;
    Handler = (value) => {
        const regex = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
        console.log("regex" + regex.test(value))
        if (regex.test(value)) {
            return true;
        }else{
            return false;
        }
    }
    constructor(value , type){
        this.value = value;
        this.type  = type;
        this.fitByType = this.Types.includes(this.type);
    }
    handle(){
        if(this.fitByType === true){
            this.Log = this.Handler(this.value);
        }
    }
    getLog(){
        if(this.Log === false){
            return {error : this.Errorname};
        }
        return true;
    }
}