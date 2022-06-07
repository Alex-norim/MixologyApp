const express = require('express');
const bodyParser = require('body-parser');
const RegistrationRouter = express.Router();

// database
const mysql = require('mysql2');
const mysqlConfig = require('./connection/mysql_connection.js');

RegistrationRouter.use(bodyParser.urlencoded({extended: false}));
RegistrationRouter.use(bodyParser.json());

// preventing html tag injection ,xss , sql injection
let validate = (data) => {
    let errorLog = '';
    let processedValue = data;
    let validators = {
        trimHTML : (value) => { return value.replace( /<.*?>/g ,'')},
        trimInvalidCharacter : (value) => { return value.replace( /\W/gi , '')}, 
        checkLength : (value) => { 
            if(value.length > 20 || value.length < 6){
                return false;
            }else{
                return value;
            }
        },
    }

    for (const key in validators) {
        let foo = validators[key];
        if(!foo(processedValue)){
            errorLog = key;
        }else{
            processedValue = foo(processedValue);
        }
        
    }

    return (errorLog) ? {isError : true , error : errorLog }:processedValue;
}
// Does user exist in db
let checkUser = async (log , pass) => {
    let sqlRequest = `SELECT name,password FROM users WHERE login='${log}' AND password='${pass}'`;
    let connection = mysql.createConnection(mysqlConfig).promise();
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
RegistrationRouter.get('/' , (req,res) => {
    res.render('form' , {
        layout : false,
        action : '/registration/signin',
        signIn : true
    })
})
RegistrationRouter.post('/signin' , (req,res) => {
    let login    = validate( req.body.login );
    let password = validate( req.body.password );
    
    checkUser(login , password).then( result => {
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
RegistrationRouter.get('/create_account' , (req, res) => {
    res.render('form' , {
        layout : false,
        action : '/registration/signin',
        signUp : true,
    })
})
RegistrationRouter.post('/signup' , (req, res) => {
    res.render()
})
module.exports = RegistrationRouter;