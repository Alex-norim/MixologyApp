const likeHandler = (e) => {
    const defColor = "rgb(182 179 179);";
    const color = '#ffffff';
    // send those two
    let userName = localStorage.getItem('name');
    let userLogin = localStorage.getItem('login')
    if(!userName){
        return false;
    }
    let _thisID = e.currentTarget.dataset.id;
    let target = e.currentTarget;

    let addToFavoriteList = (id) => {
        console.log("add")
        fetch("/auth/putlike" ,{
            method : "PUT",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                id : id ,
                login : localStorage.getItem('login')
            })
        })
        .then( result => {
            return result.json();

        })
        .then( result => {
            let response = result.response;
            let svg = target.querySelector('.svgpath');
            let ratingText = target.querySelector('.recipeRating');
            console.log(ratingText)
            console.log(response)
            if(response){
                svg.setAttribute('fill' , color);
                ratingText.textContent = response;
                ratingText.setAttribute('style' , "color:" + color)
            }
        })
        .catch( err => {
            throw err
        })
    }
    let removeFromFavoriteList = (id) => {
        console.log("remove")
        fetch("/auth/putlike" , {
            method : "DELETE",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                id : id ,
                login : localStorage.getItem('login')
            })
        })
        .then( result => {
            return result.json();
        })
        .then( result => {
            
            let response = result.response;
            let svg = target.querySelector('.svgpath');
            let ratingText = target.querySelector('.recipeRating');
            console.log(response)
            if(response || response === 0){
                svg.setAttribute('fill' , defColor);
                ratingText.textContent = response;
                ratingText.setAttribute("style" , "color:" + defColor);
            }
        })
        .catch( err => {
            throw err
        })
    }
    
    fetch("/auth/putlike" , {
        method : "POST" ,
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id : _thisID,
            login : userLogin
        })
    })
    .then( result => {
        return result.json();
    })
    .then( result => {
        let hasIt = result.res;
        if ( hasIt === true){
            // it deletes current id
            removeFromFavoriteList( _thisID );
        }else if( hasIt === false){
            // it adds 
            addToFavoriteList( _thisID );
        }
    })
    .catch( err => {
        throw err;
    })
}

export default likeHandler;