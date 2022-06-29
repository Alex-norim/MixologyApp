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
let hasUserRecipe = async(id , login)=>{
    let connection = mysql.createConnection(connectionConfig).promise() ;
    
    let sql = `SELECT id FROM users WHERE login='${login}' AND favoriteRecipe LIKE ? OR favoriteRecipe LIKE ? OR favoriteRecipe LIKE ?`;

    let arr = [ id + ',%' , '%,' + id + ",%" , "%," + id];
    return await connection.execute(sql , arr)
        .then( ([row,field]) => {
            connection.end();
            return row;
        })
        .then( result => {
            if(result.length < 1){
                return false;
            }else if(result.length > 0){
                return true;
            }
        })
        .catch( err => {
            throw err;
        })
}
// personal cabinet
authorizedUserRouter.post('/personalCabinet' , (req,res) => {

    let stringOfRecipes = req.body.arrayOfID;
    let name = req.body.name;

    getBestRecipes(stringOfRecipes)
        .then( result => {
            return result;
        }).then( result => {
            res.render("personalCab" ,{
                layout : false ,
                userName : name,
                list : result
            })
        }).catch(err => {
            res.render( "personalCab", {
                layout : false ,
                userName : name,
                list : ['sorry , some trouble']
            })
        })

})
// put like 
authorizedUserRouter.route("/putlike")
    .post( (req, res) => {
        let id = req.body.id ;
        let login = req.body.login;
        hasUserRecipe(id , login)
            .then( result => {
                if(result === true ){
                    res.send(JSON.stringify({
                        res : false
                    }))
                }else if( result === false){
                    res.send(JSON.stringify({
                        res : true
                    }))
                }
                return result;
            })
            .catch(err => {
                throw err;
            })
        
    })
    .put( (req,res) => {
        res.send('fff')
    })
    
module.exports = authorizedUserRouter;