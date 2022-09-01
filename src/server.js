var express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
var app = express();
const device = require('express-device');
const bodyParser = require('body-parser')
const PORT = 3000;
const adress = '172.20.10.5'


// routers
const Mixology_Router = require("./mixologyRouter.js");
const ArticleRouter = require('./ArticleRouter.js');
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

// middleware
app.use(express.static(__dirname))
app.use(express.static( __dirname + "/public"));
app.use(express.static(__dirname + "/dist"))
Mixology_Router.use(express.static(__dirname + "/public"));
Mixology_Router.use(express.static(__dirname + "/dist"));
ArticleRouter.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(device.capture())
// routers
app.use((req,res,next) => {
    console.log(req.device.type)
    if(req.device.type==='phone'){
        
    }
    next();
})
app.use("/mixology" ,  Mixology_Router);
app.use('/articles' , ArticleRouter);
app.use('/auth' , authorizedUserRouter);
// 

// reqs
app.get("/", function(req,res){  
    res.render("home.hbs" , {
        title : 'Mixology',
        name : 'In short...',
    }) 
    
});
app.get('/bundler.js' , (req,res) => {
    console.log('bundle')
})
app.get("/home", function(req,res){  
    res.render('home.hbs' , {
        layout : false , 
        name : 'In short...'
    });
    
});
// other reqs

app.listen(PORT , adress , () => {
    console.log(`server is run at http://${adress}:${PORT}`)
});