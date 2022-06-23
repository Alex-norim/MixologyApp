const express = require('express');
const authorizedUserRouter = express.Router();
const mysql = require('mysql2');
let bodyParser = require('body-parser');
const connectionConfig = require('./connection/mysql_connection.js') ;

authorizedUserRouter.use(bodyParser.urlencoded({extended: false}));
authorizedUserRouter.use(bodyParser.json());

let getBestRecipes = async (strOfRecipes) => {
    let sql = `SELECT recipe from coctails WHERE id IN (${strOfRecipes})`;
    let connection = mysql.createConnection(connectionConfig).promise() ;

    return await connection.execute(sql)
        .then( ([row , field]) => {
            connection.end();
            return row;
        })
        .then( data => {
            let sentIt = data.map( elem => elem.recipe);
            return sentIt;
        })
        .catch( err => {
            return {
                res : 'DB not found'
            }
        })

}
authorizedUserRouter.post('/getBestRecipes' , (req,res) => {
    let stringOfRecipes = req.body.arrayOfID.join(',');
    
    getBestRecipes(stringOfRecipes).then( result => {
        return result;
    }).then( result => {
        res.send( JSON.stringify({
            list : result
        }));
    }).catch(err => {
        res.send( JSON.stringify({
            list : ['db not found(((((']
        }));
    })
})

module.exports = authorizedUserRouter;