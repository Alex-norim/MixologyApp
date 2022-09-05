const express = require('express');
const authorizedUserRouter = express.Router();
const mysql = require('mysql2');
const EventEmitter  = require('events');
const evEmitter = new EventEmitter();

const cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const connectionConfig = require('./connection/mysql_connection.js') ;
const bcrypt = require('bcrypt');
//

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const mySQLstore = require('express-mysql-session');

//
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { 
            id: user.id, 
            login : user.login,
            name : user.name,
            favoriteRecipe : user.favoriteRecipe
        });
    });
});
passport.deserializeUser(function(user, cb) {
    const connection = mysql.createConnection(connectionConfig).promise();
    connection.execute(`SELECT name,login,email,favoriteRecipe FROM users WHERE id=?` , [user.id])
        .then( ([row,field]) => {
            let user = row[0];
            connection.end();
            process.nextTick(function() {
                return cb(null, user);
            });
        })

});

authorizedUserRouter.use(bodyParser.urlencoded({extended: false}));
authorizedUserRouter.use(bodyParser.json());
authorizedUserRouter.use(cookieParser())
authorizedUserRouter.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized : false,
    store: new mySQLstore(connectionConfig)
}));
authorizedUserRouter.use(passport.initialize());
authorizedUserRouter.use(passport.session());

// emitter
evEmitter.on('start' , () => {
    const connection = mysql.createConnection(connectionConfig).promise();
    connection.execute('select * from coctails where id=1')
        .then( ([row,field]) => {
            return row
        })
})
passport.use(new LocalStrategy( 
    {usernameField:"login", passwordField:"password"},
    ( login , password , done) => {
    const connection = mysql.createConnection(connectionConfig).promise();
    const sql = `SELECT id,name,login,password,favoriteRecipe FROM users WHERE login=?`;
    connection.execute(sql , [login])
        .then( ([row,field]) => {
            connection.end();
            return row;
        })
        .then( result => {
            if(!result[0]){
                return done(null,false,{message : 'user not found'})
            }
            bcrypt.compare(password , result[0].password , (err , res) => {
                if(res){
                    console.log('passed')
                    done(null , result[0])
                }else{
                    console.log('not passed')
                    return done(null , false , {message : 'incorrect password'})
                }
            } )

        })
        .catch(err => {
            console.log('catch')
            return done(null , false , {message : 'db not found'})
        })
}));
// 
authorizedUserRouter.post('/signin' , 
    passport.authenticate('local' , { successMessage :'you are logged'}) ,
    (req,res) => {
        let userData = {
            login : req.user.login,
            name : req.user.name,
            list : req.user.favoriteRecipe
        }
        if(req.user){
            res.send(JSON.stringify({
                exist : true ,
                response : userData
            }))
        }
});
authorizedUserRouter.get('/logout' , (req,res,next) => {
    req.logout( (err)=> {
        if(err){
            return next(err)
        }
        res.send(JSON.stringify({
            res : true,
            message :'You leave us'
        }))
    })
})

authorizedUserRouter.post('/signup' , async(req,res,next) => {
    const name = req.body.name;
    const login = req.body.login;
    const password = await bcrypt.hash(req.body.password , 10);
    const email = req.body.email;
    const subscribe = req.body.subscribe;
    const connection = mysql.createConnection(connectionConfig).promise();
    const SQL = `INSERT INTO users (name, login, password, email, subscribe) VALUES (?,?,?,?,?)`;
    // console.log(name,login,email,subscribe)
    connection.execute(SQL , [name, login ,password , email , subscribe])
        .then( result => {
            connection.end();
            console.log(result);
            res.send(JSON.stringify({
                isRegistered : true , 
                message : 'User has been registered successfully'
            }))
        })
        .catch( err => {
            res.send(JSON.stringify({
                isRegistered : false ,
                message : "This login already exists"
            }))
        })
})
authorizedUserRouter.get('/auth_Status', (req,res) => {
    if(req.user){
        res.send( JSON.stringify({
            res : true,
        }));
    }else{
        res.send( JSON.stringify({
            res : false,
        }))
    }
    
})
authorizedUserRouter.get('/personalCabinet', (req,res) => {
    const name = req.user.name;
    const login = req.user.login;
    const email = req.user.email;
    console.log(req.user)
    res.render('cabinet.hbs' , {
        layout:false,
        UserName: name,
        UserLogin : login,
        UserEmail: email
    })
    
})
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

authorizedUserRouter.get('/getBestRecipes' , async (req, res) => {
    const best = req.user.favoriteRecipe;
    let  sql = `SELECT id,recipe,rating FROM coctails WHERE id IN (${best})`
    await makeRequestToServer(sql)
    .then( result => { 
        res.send(JSON.stringify({
            res : result
        }))
    })
    .catch(err => {
        res.send(JSON.stringify({
            res : 'you are not authorized'
        }))
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