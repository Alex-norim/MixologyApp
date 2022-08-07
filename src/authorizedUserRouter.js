const express = require('express');
const authorizedUserRouter = express.Router();
const mysql = require('mysql2');
let bodyParser = require('body-parser');
const connectionConfig = require('./connection/mysql_connection.js') ;

authorizedUserRouter.use(bodyParser.urlencoded({extended: false}));
authorizedUserRouter.use(bodyParser.json());

authorizedUserRouter.use( (req,res,next) => {
    let userLogin = req.body.login || false;
    let userName  = req.body.name  || false;
    (userLogin) ? res.locals.currentLogin = userLogin : '';
    (userName)  ? res.locals.currentName  = userName  : '';
    next();
})
// Does user exist in db
let logIn = async (log , pass) => {
    let sqlRequest = `SELECT name,login,favoriteRecipe FROM users WHERE login='${log}' AND password='${pass}'`;
    let connection = mysql.createConnection(connectionConfig).promise();
    let userIsChecked = await connection.execute(sqlRequest)
        .then( ([row,field])  => {
            return row;
        })
        .then(result => {
            connection.end();
            if(result.length > 0){
                // in the future i m gonna add some code 
                return {
                    user : 'true',
                    body : result
                };
            }else{
                return {
                    user : false ,
                    error : "Login or password is invalid"
                }
            }
            
        })
        .catch( err => {
            return {
                user : false ,
                error : "Database not approachable"
            }
        });
        
    return userIsChecked;
    // next 
};
// make default request to the db
async function makeRequestToServer (sql) {
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
            console.log(result)
            let list = result[0].favoriteRecipe;
            if(list.length >=1 ){
                let sqlParts = list;
                let getNotes = `SELECT id,recipe,rating FROM coctails WHERE id IN (${sqlParts})`;
                return makeRequestToServer(getNotes)
                    .then(result => {
                        return result;
                    });
            }else if( list.length < 1 || !result){
                return ['Server not found'];
            }

        })
        .catch(err => {
            return ['Server not found'] ;
        });
}   
let hasUserRecipe = async(id , login)=>{
    let connection = mysql.createConnection(connectionConfig).promise();
    let sql = `SELECT id FROM users WHERE login='${login}' AND (favoriteRecipe LIKE ? OR favoriteRecipe LIKE ? OR favoriteRecipe LIKE ? OR favoriteRecipe LIKE ?)`;
    let params = [ id + ',%' , '%,' + id + ",%" , "%," + id , id];
    
    return await connection.execute(sql , params)
        .then( ([row,field]) => {
            return row;
        })
        .then( result => {
            connection.end();
            if(result.length === 1){
                return true;
            }else if(result.length === 0){
                return false;
            }
        })
        .catch( err => {
            throw err;
        })
}

// personal cabinet
authorizedUserRouter.post('/signin' , (req,res) => {

    let login    = req.body.login;
    let password = req.body.password;
    
    logIn(login , password)
        .then( result => {
            if(result.user){
                res.send(JSON.stringify({
                    exist : true ,
                    response : result.body
                }))
            }else{
                res.send(JSON.stringify({
                    exist : false ,
                    error : result.error
                }))
            }
        })
})
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
    let userLogin = res.locals.currentLogin;
    let userName  = res.locals.currentName;

    res.send( JSON.stringify({
        userName : userName,
    }));
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
        let ID = Number(req.body.id) || false;
        let Login = req.body.login || false;

        let increaseRating = async(id) => {
            // rating returns decreased rating number by 1 
            let rating = await makeRequestToServer(`SELECT rating FROM coctails WHERE id="${id}"`).then( result => result[0].rating + 1);
            // write new data in rating field
            return await makeRequestToServer(`UPDATE coctails SET rating='${rating}' WHERE id="${id}"`)
                .then( result => {
                    return result.changedRows;
                })
                .then( result => {
                    if(result > 0){
                        return rating;
                    }
                    return false;
                })

        }
        let updateLike = () => {
            let rewriteList = async ( string , login) => {
                let newlist = `UPDATE users SET favoriteRecipe = '${string}' WHERE login='${login}';`;
                let isRewrotten = await makeRequestToServer(newlist)
                    .then( result => {
                        return result.affectedRows
                    })
                    .then( result => {
                        if (result > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .catch(err => {
                        return false;
                    })

                return isRewrotten;
            };

            makeRequestToServer(`SELECT favoriteRecipe FROM users WHERE login='${Login}'`)
                .then( result => {
                    return result;
                })
                .then( async (result) => {
                    let list = result[0].favoriteRecipe
                        .split(',')
                        .filter( item => item && item!=='')
                        .join(',');
                    let newList = (!list || list === '') 
                        ?
                        // if user has empty field od flist
                            (ID).toString() 
                        :
                        // add new item to existing list
                            list + ',' + (ID).toString();
                    
                    let isRewrotten = await rewriteList(newList , Login).then( x => x);
                    let rating      = await increaseRating(ID).then( x=> x);
                    isRewrotten === true && rating 
                        ?
                            res.send(JSON.stringify({
                                response : rating
                            }))
                        :
                            res.send(JSON.stringify({
                                response : false
                            }))
                });
        };
        
        typeof ID === 'number' && typeof Login === 'string' 
            ? 
            updateLike() 
            : 
            res.send(JSON.stringify({
                response : false
            }))
    })
    .delete( (req, res) => {
        let ID = req.body.id;
        let Login = req.body.login;
        let decreaseRating = async(id) => {
            // rating returns decreased rating number by 1 
            let rating = await makeRequestToServer(`SELECT rating FROM coctails WHERE id="${id}"`).then( result => result[0].rating - 1);
            // write new data in rating field
            return await makeRequestToServer(`UPDATE coctails SET rating='${rating}' WHERE id="${id}"`)
                .then( result => {
                    return result.changedRows;
                })
                .then( result => {
                    if(result > 0){
                        return rating;
                    }
                    return false;
                })
        }
        // updating favorite list;
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
                        if(result > 0){
                            // return new rating
                            decreaseRating(ID).then(result => {
                                res.send(JSON.stringify({
                                    response : result
                                }))
                            })
        
                        }else{
                            res.send(JSON.stringify({
                                response : false
                            }))
                        }
                    })
            })
            .catch(err => {
                return false;
            })
    });
authorizedUserRouter.get('/getcategory' , (req,res) => {
    let sql = `SELECT DISTINCT category FROM coctails`;
    makeRequestToServer( sql )
        .then( result => {
            if(result){
                return result.map( el => el.category );
            }else{
                return [false];
            }
            
        })
        .then( result => {
            res.send( JSON.stringify({
                res : result
            }))
        })
        .catch( err => {
            throw err;
        })
})
authorizedUserRouter.post('/recomendnewrecipe' , (req, res) => {
    let recipe = req.body.newrecipe;
    let category = req.body.flavor;
    let strength = req.body.strength;
    let SQLRequest =    `INSERT INTO coctails (strength , recipe , category , brand, rating )` + 
                        ` VALUES ('${strength}' , '${recipe}' , '${category}' , 'unknown' , 0)`
    makeRequestToServer(SQLRequest)
        .then( result => {
            if (result ) {
                res.send(JSON.stringify({
                    res : 'added successfully',
                    isAdded : true
                }))
            } else{
                res.send(JSON.stringify({
                    res : 'some errorr',
                    isAdded : false
                }))
            }
        })
        .catch( err => {
            console.log("errrrrrorrrr")
        })
})
    
module.exports = authorizedUserRouter;