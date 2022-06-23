export default class LocalStorage {
    constructor(){
        
    }
    setData(obj){
        for (const key in obj) {
            localStorage.setItem(key , obj[key])
        }
    }
    removeData(arr){
        for(const value of arr){
            localStorage.removeItem(value)
        }
    }
    getData(key){
        return localStorage.getItem(key);
    }  
}

