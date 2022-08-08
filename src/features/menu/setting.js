export const Setting = {
    mobileButton : {
        tagname : 'div',
        attr : {
            class: "smallScreenButton"
        },
        content : '<div class="line"></div><div class="line"></div><div class="line"></div>'
    },
    home : {
        tagname : 'a' ,
        attr : {
            class : 'menu-main-link home',
            href  : "/home"
        },
        content : "home" 
    },
    mixology : {
        tagname : 'a' ,
        attr : {
            class : 'menu-main-link mixology',
            href  : "/mixology"
        },
        content : "mixology"  
    },
    article : {
        tagname : 'a' ,
        attr : {
            class : 'menu-main-link articles',
            href  : "/articles"
        },
        content : "Articles" 
    },
    "Sign in" : {
        tagname : 'a' ,
        attr : {
            class : 'menu-main-link registration',
            href  : "/registration"
        },
        content : "Sign in" 
    }
    ,
    cabinet : {
        tagname : 'a' ,
        attr : {
            class : 'menu-main-link registration' ,
            href : "/auth/personalCabinet"
        },
        content : 'Cabinet'
    },
    userLogged : {
        "home"     : "/home" ,
        "mixology" : "/mixology",
        "brands"   : "/tabaco",
        ""         : "/auth/personalcab"
    }
}