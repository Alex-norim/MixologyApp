const express = require('express');
const Mixology_Router = express.Router();

async function getTasteBy(sqlReq){
    const mysqlConfig = require('./features/mysql_connection');
    const mysql = require('mysql2');
    let data = 'server not found';
    let conn = mysql.createConnection(mysqlConfig).promise();
    data = await conn.execute(sqlReq).then( ([row,field]) => {
        return row;
    }).then( result => {
        conn.end();
        return result.map(el=>el.recipe);
    }).catch( err => {
        console.log('mr is not est')
    });
    
    return data;
}

// ------------------------------ ROUTERS
Mixology_Router.get("/" , (req,res) => {
    
    const sqlRequest = `SELECT recipe FROM coctails where 1 ORDER BY rating DESC LIMIT 10`;

    getTasteBy(sqlRequest).then(result => {
        if(result){
            res.render('mixology.hbs' , {
                layout: false ,
                title : 'mixology',
                topTen : result,
            })
        }
    }).catch( err => {
        res.send(`<div class='container'>Server not found</div>`);
        // console.log(err )
        throw err;
    })

});

Mixology_Router.get("/fresh" , (req,res) => {
    let category = req.url.slice(1);
    const sqlRequest = `SELECT recipe FROM coctails where category='${category}' ORDER BY rating DESC LIMIT 10`;
    res.setHeader('Content-Type', 'application/json');

    getTasteBy(sqlRequest).then(result => {
        res.send( JSON.stringify({
            res : result,
            taste : category
        }))
    }).catch(err => {
        res.send( JSON.stringify({
            res : 'Dababase is not approachable',
            taste : category
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
            res : result,
            taste : category
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
            res : result,
            taste : category
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
            res : result,
            taste : category
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
            res : result,
            taste : category
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
            res : result,
            taste : category
        }))
    }).catch(err => {
        res.send( JSON.stringify({
            res : 'Dababase is not approachable'
        }))
        throw err;
    });
    
})
module.exports = Mixology_Router;