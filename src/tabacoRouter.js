const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const TabacoRouter = express.Router();

const content = {
    title : "Tabaco" ,
    value : "some text of tabaco sort",
    text : "some rext",
    menuLinks : [
        { name : 'Home' , link : '/'},
        { name : 'Mixology' , link : '/mixology'},
        { name : 'Tabaco' , link : '/tabaco'},
        { name : 'About project' , link : '/project'},
    ],
    content : 'As a fun of hookah I prefer listed brands of tabaco you see in the left bar. You can get some interesting things about the company who produces this brand , origin and other details'
};


const config = require('./features/mysql_connection');

const pathToSavedRequests = './src/savedSqlRequests/';
TabacoRouter.use( (req,res,next) => {
    next()
})
TabacoRouter.get("/" , (req,res) => {
    let tabacoCompanyes = fs.existsSync(pathToSavedRequests + 'companyNames.json');

    if(!tabacoCompanyes){
        const getCompanyNames = `SELECT DISTINCT company FROM brand`;
        const connection = mysql.createConnection(config);
        connection.connect();
        connection.query(getCompanyNames , (err, row) => {
            if(err){
                console.log(err)
            }else{
                fs.writeFileSync( pathToSavedRequests + 'companyNames.json' , JSON.stringify(row));
                let dt = row.map(el=> el.company);
                res.render("tabaco.hbs" , {
                    ...content,
                    tabacoMaker : dt,
                });
            }
        })
        connection.end();
    }else{
        let names = fs.readFileSync(pathToSavedRequests + 'companyNames.json');
        let parsedCompanyNames = JSON.parse(names).map(el => el.company);
        res.render("tabaco.hbs" , {
            ...content,
            tabacoMaker : parsedCompanyNames,
        });
    }
})

TabacoRouter.get('/burn' , (req,res) => {
    const Connection = mysql.createConnection(config);
    Connection.connect();
    const query = `SELECT `;
    res.render('tabaco' , {
        ...content,
        
    })
    Connection.end()
})


module.exports = TabacoRouter; 