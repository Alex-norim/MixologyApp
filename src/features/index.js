( function(){
    

})();
class App{
    constructor(initElement){
        this.root = initElement; 
    }

    hangHundlerOnMixologyMenu(){
        let mixologyMenuButtons = document.getElementById('mixology-menu').getElementsByClassName('menu-main-link') ;
        let list = document.getElementById('recipe-list');

        // handlers
        let getRecipe = async (event) => {
            list.innerHTML = '';
            let request = event.target.getAttribute('data-req')
            let recipe =  await fetch( request ).then( result => result.json()).then( res => res);
            recipe.res.forEach(element => {
                let newLi = document.createElement('li');
                    newLi.classList.add('recipe-list-item');
                    newLi.innerHTML = element;
                list.append(newLi);
            });
        };

        for (const item of mixologyMenuButtons) {
            item.addEventListener('click' , getRecipe )
        }
    };

    init(){
        this.hangHundlerOnMixologyMenu()
    }
}

let app = new App(document.getElementById('root'));
app.init()