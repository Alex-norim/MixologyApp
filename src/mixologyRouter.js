const express = require('express');
const Mixology_Router = express.Router();
const hbs = require('handlebars');

hbs.registerHelper('toAddOne' , function(num){
    return num +1;
})
async function getTasteBy(sqlReq){
    const mysqlConfig = require('./connection/mysql_connection.js');
    const mysql = require('mysql2');
    let data;
    let conn = mysql.createConnection(mysqlConfig).promise();
    data = await conn.execute(sqlReq)
        .then( ([row,field]) => {
            return row;
        })
        .then( result => {
            conn.end();
            return {
                success : true,
                responce : result
            };
        }).catch( err => {
            return {
                success : false
            };
        });
    return data;
}

// ------------------------------ ROUTERS
Mixology_Router.get("/" , (req,res) => {
    const sqlRequest = `SELECT id,recipe,rating FROM coctails where 1 ORDER BY rating DESC LIMIT 10`;
    
    getTasteBy(sqlRequest).then(result => {
        if(result.success){
            res.render('mixology.hbs' , {
                layout: false ,
                IsDatabase : true,
                title : 'mixology',
                topTen : result.responce,
            })
        }else{
            res.render('mixology.hbs' , {
                layout: false ,
                IsDatabase : false,
                title : 'mixology',
                topTen : 'Server not found',
            })
        }
    })
});
Mixology_Router.get( /fresh|tart|sweet|spicy|dessert|original|topten/ , (req,res) => {
    let category = req.url.slice(1);
    let sqlRequest = `SELECT id,recipe,rating FROM coctails where category='${category}' ORDER BY rating DESC LIMIT 10`;
    if(category === "topten"){
        sqlRequest = `SELECT id,recipe,rating FROM coctails ORDER BY rating DESC LIMIT 10`;
    }
    res.setHeader('Content-Type', 'application/json');

    getTasteBy(sqlRequest).then(result => {
        if(result.success){
            res.send( JSON.stringify({
                list : result.responce,
                category : category,
                database: true
            }))
        }else{
            res.send( JSON.stringify({
                list : ['Server not found'],
                category : category,
                database : false
            }))
        }
        
    }).catch(err => {
        throw err;
    });

});

module.exports = Mixology_Router;