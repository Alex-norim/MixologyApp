var express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
var app = express();
// routers
const Mixology_Router = require("./mixology.js");
// page info
const PAGE_INFO = require("./public/pageRender/pageinfo.js")

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


//             REQUESTS
app.get("/", function(req,res){  
    res.render("home.hbs" , PAGE_INFO.homePage );
});

// mixology router
app.use("/mixology" ,  Mixology_Router);

app.get("/tabaco" , (req,res) => {
    res.render("tabaco.hbs" , PAGE_INFO.mixology );
})
app.get("/about_project" , (req,res) => {
    res.render("project.hbs" , PAGE_INFO.project );
})
app.listen(3000);