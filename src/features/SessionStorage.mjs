export default class SessionStorage {
    constructor(){

    }
    setData(obj){
        for (const key in obj) {
            sessionStorage.setItem(key , obj[key])
        }
    }
    getData(key){
        return sessionStorage.getItem(key)
    }  
}

