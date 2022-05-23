const express = require('express');

const TabacoRouter = express.Router();
const PAGE_INFO = require("./public/pageRender/pageinfo.js").tabaco;

async function getCompanynames(sqlReq){
    const mysql = require('mysql2');
    const mysqlConfig = require('./features/mysql_connection');
    let data = 'can not reach server';
    let conn = await mysql.createConnection(mysqlConfig).promise();
    data = await conn.execute(sqlReq).then( ([row, field]) => {
        return row;
    }).then( result => {
        conn.end()
        return result.filter( el => el.company )
    }).catch(err => {
        console.log('tr conn is not est');
    })
    // await conn.end();
    return data;
}
// middleware functions
TabacoRouter.use('/' , (req,res,next) => {
    
    next()
})

// common requests
TabacoRouter.get("/" , (req,res) => {
    const sqlReq = `SELECT DISTINCT company FROM brand`;
    const defaultContent = 'Just click on the left menu to get actual information of shisha tabaco brand '
    getCompanynames(sqlReq).then( result => {
        res.render("tabaco.hbs" , {
            layout : false ,
            ...PAGE_INFO,
            tabacoMaker : result,
            content : defaultContent
        });
    }).catch( err => {

        res.send('<div class="container">Server not found</div>');
        throw err;
    })
})

TabacoRouter.get('/burn' , (req,res) => {
    
    
    res.render('tabaco' , {
        ...PAGE_INFO,
        tabacoMaker : parsedCompanyNames,
        content : ''
    })
})

TabacoRouter.get('/darkside' , (req,res) => {
    res.render('tabaco' , {
        ...PAGE_INFO,
        tabacoMaker : parsedCompanyNames,
        content : 'text[url]'
    })
})

TabacoRouter.get('/armango' , (req,res) => {
    
    res.render('tabaco' , {
        ...PAGE_INFO,
        tabacoMaker : parsedCompanyNames,
        content : 'text[url]'
    })
})

TabacoRouter.get('/musthave' , (req,res) => {
    
    res.render('tabaco' , {
        ...PAGE_INFO,
        tabacoMaker : parsedCompanyNames,
        content : 'text[url]'
    })
})


module.exports = TabacoRouter; 