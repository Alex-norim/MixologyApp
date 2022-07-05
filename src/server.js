var express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
var app = express();
const cookieParser = require('cookie-parser')


// routers
const Mixology_Router = require("./mixologyRouter.js");
const TabacoRouter = require('./tabacoRouter.js');
const RegistrationRouter = require('./registrationRouter.js');
const authorizedUserRouter = require('./authorizedUserRouter.js');
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
// app.use(express.static(__dirname + "/features"));
// middleware
Mixology_Router.use(express.static(__dirname + "/public"));
// Mixology_Router.use(express.static(__dirname + "/features"));

app.use(express.static(__dirname + "/dist"));
Mixology_Router.use(express.static(__dirname + "/dist"));
Mixology_Router.use(express.static(__dirname + "/dist"));
TabacoRouter.use(express.static(__dirname + "/public"));
app.use(cookieParser('secret key'));



// reqs
app.get("/", function(req,res){  
    res.render("home.hbs" , {
        title : 'Mixology',
        name : 'In short...',

    }) 
    
});
app.get("/home", function(req,res){  
    
    
    res.render('home.hbs' , {
        layout : false , 
        name : 'In short...'
    });
    
});
app.use("/rejected" , (req ,res) => {
    const respText = `<h1 style="text-align:center ; color :'red'" >An access is rejected</h1>`;
    res.send(respText);

})

// routers
app.use("/mixology" ,  Mixology_Router);
app.use('/tabaco' , TabacoRouter);
app.use('/registration' , RegistrationRouter);
app.use('/auth' , authorizedUserRouter);
// other reqs

app.listen(3000);