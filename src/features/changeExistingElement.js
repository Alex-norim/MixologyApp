
export default class ChangeDom {
    constructor (root){
        this._root = root;
    }
    changeRegistrationButton(name , href){
        let mainMenu = this._root.getElementsByClassName('menu-main')[0];
        let lastElementOfMenu = mainMenu.getElementsByClassName('registration')[0];
        lastElementOfMenu.setAttribute('href' , href );
        lastElementOfMenu.textContent = name ;
    }
}