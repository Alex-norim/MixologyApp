const express = require('express');

const TabacoRouter = express.Router();

const PAGE_INFO = require("./public/pageRender/pageinfo.js")
const CONTENT = PAGE_INFO.tabaco.content;
const connection = require('./features/mysql_connection');

TabacoRouter.get("/" , (req,res) => {
    res.render("tabaco.hbs" , PAGE_INFO.tabaco );
})

TabacoRouter.post("/get_brands" , (req,res) => {
    connection.connect( err => {
        (err)?console.log(err):console.log("success");
    })

    connection.end( err => {
        (err)?console.log(err):console.log("closed")
    })

    res.render('tabaco' , {
        ...PAGE_INFO.tabaco ,
        text : "some rext"
    })
})
module.exports = TabacoRouter; 