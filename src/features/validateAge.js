function validateAge () {
    function allowAccess () {
        let URL = window.location.href;
        fetch(URL).then(data => {
                document.cookie = "isAccess=true";
            });
        this.parentNode.parentNode.style.display = 'none';
    }
    function rejectAccess () {
        let url = "/reject_access";
        fetch(url , {method : "POST"})
            .then(res => {
                return res.text();

            })
            .then(resBody => {
                document.cookie = "isAccess=false";
                document.write(resBody)
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

    console.log(document.cookie)
    document.body.appendChild(background);
};
// cookie 
function getCookie (cookie , cookieName) {
    
    let value = cookie.split(";").filter( el => {
        if(el.match(cookieName)){
            return el;
        };
        
    });

    return value[0].trim().replace(cookieName + "=" , '');
}

document.cookie = "isAccess=false"
document.cookie = "name=john";
document.cookie = "age=26"
console.log(getCookie(document.cookie , "isAccess"))

window.onload = validateAge();
// console.log(document.cookie)