var express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
var app = express();
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');

// routers
const Mixology_Router = require("./mixologyRouter.js");
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
// middleware
Mixology_Router.use(express.static(__dirname + "/public"));
Mixology_Router.use(express.static(__dirname + "/features"));
// TabacoRouter.use( express.static( __dirname + '/jsonFiles'));
TabacoRouter.use(express.static(__dirname + "/public"));
app.use(cookieParser('secret key'));



// reqs
app.get("/", function(req,res){  
    
    res.setHeader('isJson' , 'false')
    res.render("home.hbs" , {...PAGE_INFO.homePage}) 
    
});
app.get("/home", function(req,res){  
    
    
    res.render('home.hbs' , {
        layout : false , 
        title : 'home Page'
    });
    
});
app.use("/rejected" , (req ,res) => {
    const respText = `<h1 style="text-align:center ; color :'red'" >An access is rejected</h1>`;
    res.send(respText);

})

// routers
app.use("/mixology" ,  Mixology_Router);
app.use('/tabaco' , TabacoRouter);
// other reqs

app.get("/project" , (req,res) => {
    res.setHeader('Content-Type', 'application/text');
    res.render("project.hbs" , {
        layout : false,
        ...PAGE_INFO.project
    } );
})

app.listen(3000);