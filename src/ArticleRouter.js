const express = require('express');
const ArticleRouter = express.Router();
const mysql = require('mysql2');
const mysqlConfig = require('./connection/mysql_connection');
// middleware functions

// common requests
ArticleRouter.get("/" , (req,res) => {
    res.send('articles')
    
})

module.exports = ArticleRouter; 