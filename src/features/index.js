
class App{
    constructor(initElement){
        this.root = initElement; 
    }
    // mixology 
    hangHundlerOnMixologyMenu(){
        let root = document.getElementById('mixology');
        let mixologyMenuButtons = root.getElementsByClassName('menu-main-link') ;
        let title = document.getElementById('list-title')
        let list = document.getElementById('recipe-list')
        
        // handlers
        let getRecipe = async (event) => {
            event.preventDefault();
            let request = event.target.getAttribute('href');
            let recipe  = await fetch( request ).then( result => result.json() ).catch(err=>{
                throw err;
            });
            
            list.innerHTML = '';
            title.innerHTML = `Top 10 ${recipe.taste} recipts`;
            for (const iterator of recipe.res) {
                let li = document.createElement('li');
                li.classList.add('recipe-list-item');
                li.innerHTML = iterator;
                list.appendChild(li);
            }
            
        };

        for (const item of mixologyMenuButtons) {
            item.addEventListener('click' , getRecipe )
        }
        return false;
    };
    // tabaco
    hangHundlerOnTabacoMenu (){
        let root = document.getElementById('tabacoContent');
        let tabacoMenuItem = root.getElementsByClassName('menu-main-link');
        let contentPlace = document.getElementById('tabacoHistory');
        let getData = async (event) => {
            let URL = event.target.getAttribute('data-link');
            contentPlace.innerHTML = '';
            let data = await fetch(URL , {method: 'GET'}).then( result => {
                console.log(result)
                return result.json();
            }).catch(err => {
                console.log('errrrrrr')
            });
            contentPlace.innerHTML = data.res;
        }

        for (const item of tabacoMenuItem) {
            item.addEventListener('click' , getData)
        }

    }
    hangHundlerOnMineMenu(){
        let mineMenuItems = document.getElementById('main-menu').getElementsByClassName('menu-main-link');
        
        let getpage = async (event) => {
            event.preventDefault();
            let bodyContent = document.getElementById('body-content');
            let request = event.target.getAttribute('href');
            let data = await fetch(request).then( result => {
                return result.text();
            } ).catch( err => {
                throw err;
            })

            bodyContent.innerHTML = data;
            // if(request === '/mixology'){
            //     console.log(request)
    
            // }

            // to bind functions on the current main menu content
            switch (request) {
                case '/mixology':
                    this.hangHundlerOnMixologyMenu();
                    break;
                case '/tabaco':
                    this.hangHundlerOnTabacoMenu();
                    break;
                default:
                    break;
            }
            return false;
        }

        for (const item of mineMenuItems) {
            item.addEventListener('click' , getpage )
        }

    }
    init(){
        this.hangHundlerOnMineMenu();
    }
}

let app = new App(document.getElementById('root'));
app.init();

