const express = require('express');
const fs = require('fs');
const TabacoRouter = express.Router();
const mysql = require('mysql2');
const mysqlConfig = require('./connection/mysql_connection');
// middleware functions

// some functions
async function getCompanynames(sqlReq){
    let conn = mysql.createConnection(mysqlConfig).promise();
    let data = await conn.execute(sqlReq).then( ([row, field]) => {
        return row;
    }).then( result => {
        // close the connection
        conn.end()
        return {
            success : result.filter( el => el.company )
        }
    }).catch(err => {
        return {
            fail : ['Server not found']
        }
    })

    return data;
}



// common requests
TabacoRouter.get("/" , (req,res) => {
    const sqlReq = `SELECT DISTINCT company FROM brand`;
    const defaultContent = 'Just click on the left menu to get actual information of shisha tabaco brand '
    getCompanynames(sqlReq).then( result => {
        let commonPageSetting = {
            layout : false ,
            title: 'Tabaco brands' ,
        };
        if(result.success){
            res.render("tabaco.hbs" , {
                ...commonPageSetting,
                subtitle : '',
                tabacoMaker : result.success,
                content : defaultContent
            });
        }else if(result.fail){
            res.render("tabaco.hbs" , {
                ...commonPageSetting,
                subtitle : '',
                content : result.fail
            });
        }
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