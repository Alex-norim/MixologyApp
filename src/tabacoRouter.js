const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const TabacoRouter = express.Router();

const PAGE_INFO = require("./public/pageRender/pageinfo.js").tabaco;

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

// middleware functions
TabacoRouter.use('/' , (req,res,next) => {
    
    next()
})

// common requests
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
            ...PAGE_INFO,
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
        ...PAGE_INFO,
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
        ...PAGE_INFO,
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
        ...PAGE_INFO,
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
        ...PAGE_INFO,
        tabacoMaker : parsedCompanyNames,
        content : text[url]
    })
})


module.exports = TabacoRouter; 