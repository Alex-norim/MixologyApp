const express = require('express');
const bodyParser = require('body-parser');
const RegistrationRouter = express.Router();

RegistrationRouter.use(bodyParser.urlencoded({extended: false}));
RegistrationRouter.use(bodyParser.json());


RegistrationRouter.get('/' , (req,res) => {
    res.render('registration' , {
        layout : false
    })
})
RegistrationRouter.post('/signin' , (req,res) => {
    let login = req.body.login;
    let password = req.body.password;
    let validator = {
        trimHTML : (value) => { return value.replace( /<.*?>/g ,'')},
        trimInvalidCharacter : (value) => { return value.replace( /\W/gi , '')},
        
    }
    let validate = (data) => {
        let processedValue = data;
        for (const key in validator) {
            let foo = validator[key];
            console.log(foo)
            processedValue = foo(processedValue);
            console.log(processedValue)
        }
        return processedValue;
    }
    res.send(newValue)
})

module.exports = RegistrationRouter;