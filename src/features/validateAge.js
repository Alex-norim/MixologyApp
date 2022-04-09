function validateAge () {
    function allowAccess () {
        // let url = window.location.href;
        // fetch("/allowed" , {method : 'GET'}).then(res => {
        //     console.log(res)
        //     document.write(res.text());
        // });
        document.cookie = 'isAccess=true';
        this.parentNode.parentNode.style.display = 'none';
    }
    function rejectAccess () {
        document.cookie = 'isAccess=false';
        fetch("/rejected" , {method : 'POST'})
        .then(res => {
            return res.text();
        })
        .then(html => {
            document.write(html)
        })
    }
    let background = document.createElement('div');
        background.classList.add("age-validator-back");
    let border = document.createElement('div');
        border.classList.add("age-validator");

    let borderTitle = document.createElement("h1");
        borderTitle.classList.add("age-validator-title")
        borderTitle.innerHTML = "Are you 18 years old?";

    let buttonAccept = document.createElement("input");
        buttonAccept.setAttribute('type' , "button");
        buttonAccept.setAttribute("value" , "Yes");
        buttonAccept.classList.add("validator-btn");
        buttonAccept.addEventListener("click" , allowAccess);

    let buttonReject = document.createElement("input");
        buttonReject.setAttribute('type' , "button");
        buttonReject.setAttribute("value" , "No");
        buttonAccept.classList.add("validator-btn");
        buttonReject.addEventListener("click" , rejectAccess);
    // put elements in modal windows 
        border.append(borderTitle ,buttonAccept ,buttonReject);
        background.append(border);

    document.body.appendChild(background);
};
// cookie 
function getCookie (cookie , cookieName) {
    let value = cookie.split(";").filter( el => {
        if(el.match(cookieName)){
            return el;
        };
        
    });
    if(value[0]){
        return value[0].trim().replace(cookieName + "=" , '')
    }else{
        return undefined;
    }
}

let access = getCookie(document.cookie , "isAccess");
console.log(typeof access)
if( access === 'false'){

    console.log("false")
    validateAge();
}else if( access === undefined){
    console.log("undefffffffffff")
    document.cookie = 'isAccess=false';
}
// let getAccess = getCookie(document.cookie , "isAccess");
