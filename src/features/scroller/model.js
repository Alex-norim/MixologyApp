export const Model = {
    getWinHeight : () => {
        return window.innerHeight;
    },
    getDocHeight : () => {
        return document.body.clientHeight;
    },
    scrollEvent : (event) => {
        const target = event.currentTarget;
        const progressBar = target.querySelector('.progressBar');
        const winHeight = window.innerHeight;
        const docHeight = document.body.clientHeight;
        const userPos = Math.floor(window.pageYOffset);
        console.log(progressBar)
        if(docHeight > winHeight){
            const progressWidth = Math.round( (userPos / (docHeight-winHeight) ) * 100 ) ;
            progressBar.style.width = progressWidth + '%';
            progressBar.style.height = '100%';
        }else{
            progressBar.style.width = '100%';
            progressBar.style.height = '100%';
        }

    },
    isExistBar : () => {
        const isExistBar = document.getElementsByClassName('scrollBar')[0] || false;
        console.log("res " + isExistBar)
        return isExistBar;
    }

}