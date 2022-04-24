const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const TabacoRouter = express.Router();

const content = {
    title : "Tabaco" ,
    value : "some text of tabaco sort",
    text : "some rext",
    menuLinks : [
        { name : 'Home' , link : '/'},
        { name : 'Mixology' , link : '/mixology'},
        { name : 'Tabaco' , link : '/tabaco'},
        { name : 'About project' , link : '/project'},
    ],
};

let createCompanyNameFile = () => {
    const getCompanyNames = `SELECT DISTINCT company FROM brand`;
    const connection = mysql.createConnection(config);
    connection.connect();
    connection.query(getCompanyNames , (err, row) => {
        if(err){
            console.log(err)
        }else{
            fs.writeFileSync( pathToSavedRequests + 'companyNames.json' , JSON.stringify(row));
        }
    })
    connection.end();
}

const config = require('./features/mysql_connection');

const pathToSavedRequests = './src/savedSqlRequests/';
TabacoRouter.use( (req,res,next) => {
    console.log(res)
    next()
})
TabacoRouter.get("/" , (req,res) => {
    
    let tabacoCompanyes = fs.existsSync(pathToSavedRequests + 'companyNames.json');
    const defaultContent = 'As a fun of hookah I prefer listed brands of tabaco you see in the left bar. You can get some interesting things about the company who produces this brand , origin and other details'
    if(!tabacoCompanyes){
        createCompanyNameFile();
    }
    // if file did not exist try-catch block attempts to get created file again 
    try {
        let names = fs.readFileSync(pathToSavedRequests + 'companyNames.json');
        let parsedCompanyNames = JSON.parse(names).map(el => el.company);
        res.render("tabaco.hbs" , {
            ...content,
            tabacoMaker : parsedCompanyNames,
            content : defaultContent
        });
    } catch (error) {
        console.error(error)
    }
    
})

TabacoRouter.get('/burn' , (req,res) => {
    
    let names = fs.readFileSync(pathToSavedRequests + 'companyNames.json');
    let history = fs.readFileSync(__dirname + "/jsonFiles/companyHistory.json");
    let url = req.url.slice(1);
    let text = JSON.parse(history);
    let parsedCompanyNames = JSON.parse(names).map(el => el.company);
    res.render('tabaco' , {
        ...content,
        tabacoMaker : parsedCompanyNames,
        content : text[url]
    })
})

TabacoRouter.get('/darkside' , (req,res) => {
    
    let names = fs.readFileSync(pathToSavedRequests + 'companyNames.json');
    let history = fs.readFileSync(__dirname + "/jsonFiles/companyHistory.json");
    let url = req.url.slice(1);
    let text = JSON.parse(history);
    let parsedCompanyNames = JSON.parse(names).map(el => el.company);
    res.render('tabaco' , {
        ...content,
        tabacoMaker : parsedCompanyNames,
        content : text[url]
    })
})

TabacoRouter.get('/armango' , (req,res) => {
    
    let names = fs.readFileSync(pathToSavedRequests + 'companyNames.json');
    let history = fs.readFileSync(__dirname + "/jsonFiles/companyHistory.json");
    let url = req.url.slice(1);
    let text = JSON.parse(history);
    let parsedCompanyNames = JSON.parse(names).map(el => el.company);
    res.render('tabaco' , {
        ...content,
        tabacoMaker : parsedCompanyNames,
        content : text[url]
    })
})

TabacoRouter.get('/musthave' , (req,res) => {
    
    let names = fs.readFileSync(pathToSavedRequests + 'companyNames.json');
    let history = fs.readFileSync(__dirname + "/jsonFiles/companyHistory.json");
    let url = req.url.slice(1);
    let text = JSON.parse(history);
    let parsedCompanyNames = JSON.parse(names).map(el => el.company);
    res.render('tabaco' , {
        ...content,
        tabacoMaker : parsedCompanyNames,
        content : text[url]
    })
})


module.exports = TabacoRouter; 