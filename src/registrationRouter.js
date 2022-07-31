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
//check is login exist in db
let checkLogin = async (login) => {
    let sql = `SELECT login FROM users WHERE login='${login}'`;
    let connection = mysql.createConnection(mysqlConfig).promise();
    let json = {}
    await connection.execute(sql)
        .then( ([row , field]) => {
            return row;
        }).then( result => {
            connection.end();
            if(result.length > 0){
                json.isExist = true
            }else{
                json.isExist = false
            }
        }).catch( err => {
            json.isExist = undefined
        } )
        
    return json;
}
//Register new user 
let registerNewUser = (name , login , password , email , subscribe) => {
    let credentials = [name , login , password , email , subscribe];
    let sql = `INSERT INTO users (name, login, password, email, subscribe) VALUES (?,?,?,?,?)`;

    let connection = mysql.createConnection(mysqlConfig).promise();

    let isRegistered = connection.execute(sql , credentials).then( result => {
        connection.end();
        return {isRegistered : true}
    }).catch( err => {
        return {isRegistered : false}
    });

    return isRegistered;
}

RegistrationRouter.post('/signup' , (req, res) => {
    let login = validate(req.body.login);
    let name = validate(req.body.name);
    let email = req.body.email;
    let password = validate(req.body.password);
    let subscribe = (req.body.subscribe === 'on') ? 1 : 0;
    
    // pass login to find out whether login exists or not ,
    // if login exists send a message login has been taken by another user
    // also it may return an error if db conn was not established
    checkLogin(login)
        .then( result => {
            return result;
        })
        .then( result => {
            
            if(result.isExist === false){
                registerNewUser(name , login , password ,email ,subscribe) 
                res.send(JSON.stringify({
                    isRegistered : true , 
                    message : 'User has been registered successfully'
                }))
            }else if(result.isExist === true){
                res.send(JSON.stringify({
                    isRegistered : false ,
                    message : "This login already exists"
                }))
            }else{
                res.send(JSON.stringify({
                    isRegistered : false,
                    message : 'Some trouble with db'
                }))
            }
        })
        .catch( err => {
            console.log('errrrrrrrr')
            throw err
        });
})
module.exports = RegistrationRouter;