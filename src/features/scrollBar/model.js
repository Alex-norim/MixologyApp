export const Model = {
    scrollEvent : () => {
        const scrollbar = document.body.querySelector('#scrollbar');
        const progressBar = scrollbar.querySelector('#progressBar');
        const winHeight = window.innerHeight;
        const docHeight = document.body.clientHeight;
        const userPos = Math.floor(window.pageYOffset);
        const progressWidth = Math.round( (userPos / (docHeight-winHeight) ) * 100 ) ;
        progressBar.style.width = progressWidth + '%';
        progressBar.style.height = '100%';
    },

}