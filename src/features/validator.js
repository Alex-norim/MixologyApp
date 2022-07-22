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
    }
    errorLogger (value) {
        this.errorLog.error = value;
    }
    isObj (value) {
        typeof value === 'object' ? 
            true :
            false ;
    }
    returnErrorLog(){
        return this.errorLog;
    }
    getValidValue () {
        for (const handler of this.handlers ) {
            
            let validator = new handler(this.value , this.type);
                validator.handle()
            let result = validator.getLog();
            console.log( result);
            
        }
    }
    
};
class Length {
    Types = ['text' , 'password' , 'email'];
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
    Handler = (value) => {
        let oldValue = value;
        let newValue = value.replace(/\W/g, '');
        if(oldValue !== newValue){
            return false
        } else {
            return true
        }
    }
    constructor(value , type){
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
class ChecksAmpersand {
    Types = ['email'];
    Errorname = 'Invalid email';
    Log = null ;
    Handler = (value) => {
        const regex = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
        if (!regex.test(value)) {
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
            console.log( "types " + this.fitByType)
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