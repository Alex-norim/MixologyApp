const Mainmenu = [
    { name : 'Home' , link : '/home'},
    { name : 'Mixology' , link : '/mixology'},
    { name : 'Tabaco' , link : '/tabaco'},
    { name : 'About project' , link : '/project'},
]
const PAGE_INFO = {
    homePage : {
        title : "Home",
        style : [
            '_header' , '_footer' , "common"
        ],
        menuLinks : Mainmenu
    } ,
    mixology : {
        title : "Mixology" ,
        style : [
            '_header' , '_footer' , "common","mixology-page"
        ],
        content : {
            fresh : "Fresh taste aproaches by mint.", 
            tart : "tart taste text",
            sweet : "sweet taste text" ,
            spicy : "spicy" ,
            dessert : "desert taste text",
            original : "original taste text"
        },
        menuLinks : Mainmenu
    },
    project : {
        title : "About project" ,
        style : [
            '_header' , '_footer' , "common"
        ],
        menuLinks : Mainmenu
    }
}

module.exports = PAGE_INFO;