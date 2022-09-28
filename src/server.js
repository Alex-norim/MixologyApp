var express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
var app = express();
const device = require('express-device');
const bodyParser = require('body-parser')
const PORT = 3011;
const adress = '172.20.10.5'|| '172.0.0.1' || 'localhost';


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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(device.capture())
// routers
app.use("/mixology" ,  Mixology_Router);
app.use('/articles' , ArticleRouter);
app.use('/auth' , authorizedUserRouter);
// 

// reqs
app.get( '/' , function(req,res){  
    res.render("home.hbs" , {
        name : 'In short...',
        smallScreen : req.device.type === 'phone' ? true : false,
    }) 
    
})

app.get("/home", function(req,res){  
    res.render('home.hbs' , {
        layout : 'layout.hbs' , 
        name : 'In short...'
    });
    
});
app.post("/home", function(req,res){  
    const isLayout = req.body.layout;
    res.render('home.hbs' , {
        layout : isLayout , 
        name : 'In short...'
    });
    
});

// other reqs

app.listen(PORT , adress , () => {
    console.log(`server is run at http://${adress}:${PORT}`)
});