var express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
var app = express();

const PAGE_INFO = require("./public/page_info/page_info.js") 
//setting up
app.engine("hbs" , expressHbs.engine({
    layoutsDir: __dirname + "/views/layout", 
    defaultLayout: "layout",
    extname: "hbs"
}))
app.set("views" , __dirname + "/views")
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static( __dirname + "/public"));
console.log(__dirname)
// requests 
app.get("/", function(req,res){  
    res.render("home.hbs" , PAGE_INFO.homePage );
});
app.get("/mixology" , (req,res) => {
    res.render("mixology.hbs" , PAGE_INFO.tabaco );
})
app.get("/tabaco" , (req,res) => {
    res.render("tabaco.hbs" , PAGE_INFO.mixology );
})
app.get("/about_project" , (req,res) => {
    res.render("project.hbs" , PAGE_INFO.project );
})
app.listen(3000);