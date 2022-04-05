const express = require('express');
let app = express();

const Mixology_Router = express.Router();

// page information
const PAGE_INFO = require("./public/pageRender/pageinfo.js")


Mixology_Router.use(express.static(__dirname + "/public"));
Mixology_Router.get("/" , (req,res) => {
    
    res.render("mixology" , {
        title : PAGE_INFO.mixology.title ,
        content : "some text"
    });
});
Mixology_Router.get("/fresh_taste" , (req,res) => {
    res.render("mixology" , {
        title : PAGE_INFO.mixology.title,
        content : PAGE_INFO.mixology.content.fresh
    })
});
Mixology_Router.get("/tart_taste" , (req,res) => {
    res.render("mixology" , {
        title : PAGE_INFO.mixology.title,
        content : PAGE_INFO.mixology.content.tart
    })
})
Mixology_Router.get("/sweet_taste" , (req,res) => {
    res.render("mixology" , {
        title : PAGE_INFO.mixology.title,
        content : PAGE_INFO.mixology.content.sweet
    })
})
Mixology_Router.get("/spicy_taste" , (req,res) => {
    res.render("mixology" , {
        title : PAGE_INFO.mixology.title,
        content : PAGE_INFO.mixology.content.spicy
    })
})
Mixology_Router.get("/dessert_taste" , (req,res) => {
    res.render("mixology" , {
        title : PAGE_INFO.mixology.title,
        content : PAGE_INFO.mixology.content.dessert
    })
})
Mixology_Router.get("/original_mixes" , (req,res) => {
    res.render("mixology" , {
        title : PAGE_INFO.mixology.title,
        content : PAGE_INFO.mixology.content.original
    })
})
module.exports = Mixology_Router;