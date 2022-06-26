export default class CreateDom {
    constructor(root){
        this._root = root;
    }
    confirmation(text , acceptFunc , rejectFunc){
        let acceptance = document.createElement('button');
            acceptance.classList.add('button');
            acceptance.textContent = 'accept';
            acceptance.addEventListener('click' , acceptFunc);
        let rejection = document.createElement('button');
            rejection.classList.add('button');
            rejection.textContent = 'reject';
            rejection.addEventListener('click' , rejectFunc);
        let title = document.createElement('span');
            title.classList.add('modalWindowTitle');
            title.textContent = text ;
        let modalWindow = document.createElement('div');
            modalWindow.classList.add('modalWindow');
            modalWindow.append(title , acceptance ,rejection);
        let modalWindowWrap = document.createElement('div');
            modalWindowWrap.classList.add('modalWindowWrap');
            modalWindowWrap.append(modalWindow);
        return modalWindowWrap;
    }
}