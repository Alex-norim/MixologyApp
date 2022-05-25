const express = require('express');
const fs = require('fs');
const { __express } = require('hbs');
const TabacoRouter = express.Router();
const PAGE_INFO = require("./public/pageRender/pageinfo.js").tabaco;

// middleware functions

// some functions
async function getCompanynames(sqlReq){
    const mysql = require('mysql2');
    const mysqlConfig = require('./features/mysql_connection');
    
    let conn = await mysql.createConnection(mysqlConfig).promise();
    let data = await conn.execute(sqlReq).then( ([row, field]) => {
        return row;
    }).then( result => {
        conn.end()
        return result.filter( el => el.company )
    }).catch(err => {
        return ['Server not found']
    })
    // await conn.end();
    return data;
}



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

TabacoRouter.get(/burn|darkside|armango|musthave/ , (req,res) => {
    let name = req.url.slice(1);
    fs.readFile('src/jsonFiles/companyHistory.json' ,'utf-8' , (err , data) => {
        if(err){
            throw err
        }else{
            let hist = JSON.parse(data)[name];
            res.send(JSON.stringify({
                res : hist
            }))
        }
    });
    
})


module.exports = TabacoRouter; 