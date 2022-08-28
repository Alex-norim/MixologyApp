var express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
var app = express();
const bodyParser = require('body-parser')



// routers
const Mixology_Router = require("./mixologyRouter.js");
const ArticleRouter = require('./ArticleRouter.js');
const RegistrationRouter = require('./registrationRouter.js');
const authorizedUserRouter = require('./authorizedUserRouter.js');
//setting up
app.engine("hbs" , expressHbs.engine({
    layoutsDir: __dirname + "/views/layout", 
    defaultLayout: "layout",
    extname: "hbs"
}))

// view setup
app.set("views" , __dirname + "/views")
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static( __dirname + "/public"));

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/dist"));
app.use((req,res,next) => {
    // this midleware to check user is logged or not
    next();
})
Mixology_Router.use(express.static(__dirname + "/public"));
Mixology_Router.use(express.static(__dirname + "/dist"));
Mixology_Router.use(express.static(__dirname + "/dist"));
ArticleRouter.use(express.static(__dirname + "/public"));




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
// middleware

// routers
app.use("/mixology" ,  Mixology_Router);
app.use('/articles' , ArticleRouter);
app.use('/registration' , RegistrationRouter);
app.use('/auth' , authorizedUserRouter);
// other reqs

app.listen(3000 );