(function(){
    class setCookie {
        constructor(){
            let background = document.createElement('div');
                background.classList.add("age-validator-back");
            let border = document.createElement('div');
                border.classList.add("age-validator");
            // create title
            let borderTitle = document.createElement("h1");
                borderTitle.classList.add("age-validator-title")
                borderTitle.innerHTML = "Are you 18 years old?";
            // create left button for an agreement
            let buttonAccept = document.createElement("input");
                buttonAccept.setAttribute('type' , "button");
                buttonAccept.setAttribute("value" , "Yes");
                buttonAccept.classList.add("validator-btn");
                buttonAccept.addEventListener("click" , this.allowAccess);
            // create right button for an disagreement
            let buttonReject = document.createElement("input");
                buttonReject.setAttribute('type' , "button");
                buttonReject.setAttribute("value" , "No");
                buttonReject.classList.add("validator-btn");
                buttonReject.addEventListener("click" , this.rejectAccess);
            // put elements in modal windows 
            border.append(borderTitle ,buttonAccept ,buttonReject);
            background.append(border);
            this.validator = background;
        }
        createWindow = () => {
            let cookieState = this.getCookie('isAccess');
            if(!cookieState){
                document.cookie = 'isAccess=false;';
            }
            if(cookieState === 'false'){
                document.body.appendChild( this.validator );
            }
        }
        allowAccess = (event) => {
            let target = event.target;
                target.parentNode.parentNode.style.display = 'none';
            document.cookie = 'isAccess=true';
        }
        rejectAccess = () => {
            document.cookie = 'isAccess=false';
            fetch("/rejected" , {method : 'POST'})
            .then(res => {
                return res.text();
            })
            .then(html => {
                document.write(html)
            })
        }
        getCookie = (cookieName) => {
            let value = document.cookie.split(";").filter( el => {
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
    }
    
    const cookies = new setCookie();
    cookies.createWindow();
})()