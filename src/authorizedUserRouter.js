const express = require('express');
const authorizedUserRouter = express.Router();
const mysql = require('mysql2');
let bodyParser = require('body-parser');
const connectionConfig = require('./connection/mysql_connection.js') ;

authorizedUserRouter.use(bodyParser.urlencoded({extended: false}));
authorizedUserRouter.use(bodyParser.json());

let makeRequestToServer = async(sql) => {
    let connection = mysql.createConnection(connectionConfig).promise() ;
    return await connection.execute(sql)
        .then( ([row , field]) => {
            connection.end();
            return row;
        })
        .then( result => {
            return result;
        })
        .catch( err => {
            return false;
        })
}
let getBestRecipes = async (userLogin) => {
    //this foo has to return array of obj's like [{id : value , recipe : value , rating : value} , {obj}]
    let sqlGetList = `SELECT favoriteRecipe FROM users WHERE login='${userLogin}'`;
    return await makeRequestToServer(sqlGetList)
        .then(result => {
            return result
        })
        .then( result => {
            let list = result[0].favoriteRecipe;
            if(list.length >=1 ){
                let sqlParts = list;
                let getNotes = `SELECT id,recipe,rating FROM coctails WHERE id IN (${sqlParts})`;
                return makeRequestToServer(getNotes)
                .then(result => {
                    return result;
                });
            }else if( list.length < 1 || !result){
                return false;
            }

        })
        .catch(err => {
            return false;
        });
}   
let hasUserRecipe = async(id , login)=>{
    let connection = mysql.createConnection(connectionConfig).promise() ;
    
    let sql = `SELECT id FROM users WHERE login='${login}' AND favoriteRecipe LIKE ? OR favoriteRecipe LIKE ? OR favoriteRecipe LIKE ? OR favoriteRecipe LIKE ?`;

    let params = [ id + ',%' , '%,' + id + ",%" , "%," + id , id];
    return await connection.execute(sql , params)
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
authorizedUserRouter.post('/getBestRecipes' , (req, res) => {
    let userLogin = req.body.login;
    getBestRecipes(userLogin)
        .then(result => {
            res.send(JSON.stringify({
                res : result
            }))
        })
})
authorizedUserRouter.post('/personalCabinet' , (req,res) => {
    let userLogin = req.body.login;
    let userName  = req.body.name;

    
    res.render("personalCab" ,{
        layout : false ,
        userName : userName,
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
                        res : true
                    }))
                }else if( result === false){
                    res.send(JSON.stringify({
                        res : false
                    }))
                }
                return result;
            })
            .catch(err => {
                throw err;
            })
        
    })
    .put( (req,res) => {
        let ID = req.body.id || '';
        let Login = req.body.login;
        makeRequestToServer(`SELECT favoriteRecipe FROM users WHERE login='${Login}'`)
            .then( result => {
                return result;
            })
            .then(result => {
                let list = result[0].favoriteRecipe
                    .split(',')
                    .filter( item => item && item!=='')
                    .join(',');
                let newList;
                if(!list || list === ''){
                    newList = (ID).toString();
                }else{
                    console.log("multy "+ID)
                    newList = list + ',' + (ID).toString();
                }
                let WriteNewRecipeList = `UPDATE users SET favoriteRecipe = '${newList}' WHERE login='${Login}';`;

                makeRequestToServer(WriteNewRecipeList)
                    .then( result => {
                        return result
                    })
                    .then( result => {
                        if (result) {
                            res.send(JSON.stringify({
                                responce : true
                            }))
                        } else {
                            res.send(JSON.stringify({
                                responce : false
                            }))
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            });
        
    })
    .delete( (req, res) => {
        let ID = req.body.id;
        let Login = req.body.login;

        
        makeRequestToServer(`SELECT favoriteRecipe FROM users WHERE login='${Login}'`)
            .then( result => {
                return result[0].favoriteRecipe
                    .split(',')
                    .filter( elem => elem!==ID && elem !== '')
                    .join(',')
                    .trim();
            })
            .then( result => {
                let newList = result; 
                let sqlReq = `UPDATE users SET favoriteRecipe = '${newList}' WHERE login='${Login}';`;
                makeRequestToServer(sqlReq)
                    .then( result => {
                        return result.changedRows;
                    })
                    .then( result => {
                        (result > 0) ? 
                            res.send(JSON.stringify({
                                response: true
                            }))      : 
                            res.send(JSON.stringify({
                                response: false
                            })) 
                    })
            })
    })
    
module.exports = authorizedUserRouter;