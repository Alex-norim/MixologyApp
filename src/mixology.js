const express = require('express');
const Mixology_Router = express.Router();
const mysql = require('mysql2/promise');
const mysqlConfig = require('./features/mysql_connection');
// page information
const PAGE_INFO = require("./public/pageRender/pageinfo.js").mixology;

// const CONTENT = PAGE_INFO.mixology.content;

async function getTasteBy(sqlReq){
    let conn = await mysql.createConnection(mysqlConfig);
    let[row,field] = await conn.execute(sqlReq);
    await conn.end();
    return row.map(el=>el.recipe);
}
Mixology_Router.get("/" , (req,res) => {
    const sqlRequest = `SELECT recipe FROM coctails where 1 LIMIT 10`;
    getTasteBy(sqlRequest).then(data => data).then((d)=>{
        if(d){
            res.render("mixology" , {
                ...PAGE_INFO,
                content : d,
            });
        }
    })
        
    
});
Mixology_Router.get("/fresh" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' LIMIT 10`
    getTasteBy(sqlRequest)
        .then(data => data)
        .then(data => {
            res.render("mixology" , {
                ...PAGE_INFO,
                content: data
            })
        })
    
});
Mixology_Router.get("/tart" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' LIMIT 10`
    getTasteBy(sqlRequest)
        .then(data => data)
        .then(data => {
            res.render("mixology" , {
                ...PAGE_INFO,
                content: data
            })
        })
    
})
Mixology_Router.get("/sweet" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' LIMIT 10`
    getTasteBy(sqlRequest)
        .then(data => data)
        .then(data => {
            res.render("mixology" , {
                ...PAGE_INFO,
                content: data
            })
        })
    
})
Mixology_Router.get("/spicy" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' LIMIT 10`
    getTasteBy(sqlRequest)
        .then(data => data)
        .then(data => {
            res.render("mixology" , {
                ...PAGE_INFO,
                content: data
            })
        })
    
})
Mixology_Router.get("/dessert" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' LIMIT 10`
    getTasteBy(sqlRequest)
        .then(data => data)
        .then(data => {
            res.render("mixology" , {
                ...PAGE_INFO,
                content: data
            })
        })
    
})
Mixology_Router.get("/original" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' LIMIT 10`
    getTasteBy(sqlRequest)
        .then(data => data)
        .then(data => {
            res.render("mixology" , {
                ...PAGE_INFO,
                content: data
            })
        })
    
})
module.exports = Mixology_Router;