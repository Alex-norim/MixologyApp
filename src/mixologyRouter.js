const express = require('express');
const Mixology_Router = express.Router();
const mysql = require('mysql2/promise');
const mysqlConfig = require('./features/mysql_connection');

// page information
const PAGE_INFO = require("./public/pageRender/pageinfo.js").mixology;

// const CONTENT = PAGE_INFO.mixology.content;

async function getTasteBy(sqlReq){
    let data = 'server not found';

    try {
        let conn = await mysql.createConnection(mysqlConfig);
        let [row , field] = await conn.execute(sqlReq);
        data = row.map(el=>el.recipe);
        await conn.end();
    } catch (er) {
        console.log('---------------' + er)
        throw er;
    }
    return data;
}

let mixologyScript = 'mixology.js';
Mixology_Router.get("/" , (req,res) => {

    const sqlRequest = `SELECT recipe FROM coctails where 1 ORDER BY rating DESC LIMIT 10`;

    getTasteBy(sqlRequest).then(result => {
        if(result){
            res.render('mixology.hbs' , {
                layout: false ,
                title : 'mixology',
                topTen : result,
                script: mixologyScript
            })
        }
    })

});

Mixology_Router.get("/fresh" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' ORDER BY rating DESC LIMIT 10`;
    res.setHeader('Content-Type', 'application/json');
    
    getTasteBy(sqlRequest).then(result => {
        res.send( JSON.stringify({
            res : result
        }))
    }).catch(err => {
        res.send( JSON.stringify({
            res : 'Dababase is not approachable'
        }))
        throw err;
    });

});
Mixology_Router.get("/tart" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' ORDER BY rating DESC LIMIT 10`;
    res.setHeader('Content-Type', 'application/json');

    getTasteBy(sqlRequest).then(result => {
        res.send( JSON.stringify({
            res : result
        }))
    }).catch(err => {
        res.send( JSON.stringify({
            res : 'Dababase is not approachable'
        }))
        throw err;
    });
})
Mixology_Router.get("/sweet" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' ORDER BY rating DESC LIMIT 10`;
    res.setHeader('Content-Type', 'application/json');

    getTasteBy(sqlRequest).then(result => {
        res.send( JSON.stringify({
            res : result
        }))
    }).catch(err => {
        res.send( JSON.stringify({
            res : 'Dababase is not approachable'
        }))
        throw err;
    });
    
})
Mixology_Router.get("/spicy" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' ORDER BY rating DESC LIMIT 10`;
    res.setHeader('Content-Type', 'application/json');

    getTasteBy(sqlRequest).then(result => {
        res.send( JSON.stringify({
            res : result
        }))
    }).catch(err => {
        res.send( JSON.stringify({
            res : 'Dababase is not approachable'
        }))
        throw err;
    });
    
})
Mixology_Router.get("/dessert" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' ORDER BY rating DESC LIMIT 10`;
    res.setHeader('Content-Type', 'application/json');

    getTasteBy(sqlRequest).then(result => {
        res.send( JSON.stringify({
            res : result
        }))
    }).catch(err => {
        res.send( JSON.stringify({
            res : 'Dababase is not approachable'
        }))
        throw err;
    });
    
})
Mixology_Router.get("/original" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' ORDER BY rating DESC LIMIT 10`;

    res.setHeader('Content-Type', 'application/json');
    getTasteBy(sqlRequest).then(result => {
        res.send( JSON.stringify({
            res : result
        }))
    }).catch(err => {
        res.send( JSON.stringify({
            res : 'Dababase is not approachable'
        }))
        throw err;
    });
    
})
module.exports = Mixology_Router;