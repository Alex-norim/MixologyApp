const express = require('express');
let app = express();
app.use(express.static(__dirname + "/public"));

const Mixology_Router = express.Router();

// page information
const PAGE_INFO = require()



Mixology_Router.get("/" , (req,res) => {
    res.render("mixology.hbs")
})
// Mixology_Router.get("/fresh_taste" , (req,res) => {
    
//     res.render("mixology.hbs" , {

//         content : MIXOLOGY.mixology
//     })
// })
module.exports = Mixology_Router;