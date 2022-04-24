var express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
var app = express();
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');

// routers
const Mixology_Router = require("./mixology.js");
const TabacoRouter = require('./tabacoRouter');
// page info
const PAGE_INFO = require("./public/pageRender/pageinfo.js");
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
app.use(express.static(__dirname + "/features"));
Mixology_Router.use(express.static(__dirname + "/public"));
TabacoRouter.use(express.static(__dirname + "/public"));
app.use(cookieParser('secret key'));



// reqs
app.get("/", function(req,res){  
    res.render("home.hbs" , {
        ...PAGE_INFO.homePage
    });
});
app.use("/rejected" , (req ,res) => {
    const respText = `<h1 style="text-align:center ; color :'red'" >An access is rejected</h1>`;
    // res.setHeader('isAccess' , "false")
    res.send(respText);
    // console.log("rejected")
})
// routers
app.use("/mixology" ,  Mixology_Router);
app.use('/tabaco' , TabacoRouter);
// other reqs

app.get("/project" , (req,res) => {
    res.render("project.hbs" , {
        ...PAGE_INFO.project
    } );
})

app.listen(3000);