
export default class ChangeDom {
    constructor (root){
        this._root = root;
    }
    changeRegistrationButton(func){
        let mainMenu = this._root.getElementsByClassName('menu-main')[0];
        let lastElementOfMenu = mainMenu.getElementsByClassName('registration')[0];
        lastElementOfMenu.setAttribute('href' , '/auth/personalData');
        lastElementOfMenu.textContent = localStorage.getItem('name');
        lastElementOfMenu.classList.remove('registration');

    }
}