const express = require('express');
const ArticleRouter = express.Router();
const mysql = require('mysql2');
const mysqlConfig = require('./connection/mysql_connection');

// 
const ArticleCategoryes = async () => {
    const connection = mysql.createConnection(mysqlConfig).promise();
    const SqlRequest = `SELECT category FROM articles_category`;

    return await connection.execute(SqlRequest)
        .then( ([row, fields]) => {
            return row.map( obj => obj.category )
        })
        .catch( err => {
            return ['server not found']
        })
}
// middleware functions
ArticleRouter.use( async (req,res,next) => {
    let  articles = '';
    await  ArticleCategoryes().then( result => { articles = result });
    req.ArticlesArray = articles;
    next();
})
// common requests
ArticleRouter.get("/" , (req,res) => {
    res.render('article' , {
        layout : false,
        category : req.ArticlesArray
    });
});
ArticleRouter.get(/[a-z]/ , (req,res) => {
    const getNews = async (topic) => {
        const SqlRequest = `SELECT text,author,articlename FROM articles WHERE category='${topic}'`;
        const connection = mysql.createConnection(mysqlConfig).promise();
        return await connection.execute(SqlRequest).then( ([row,field]) => row ).catch( err=> ['server not found']);
    }
    const isMatch = req.ArticlesArray.includes(req.url.slice(1));
    if(isMatch){
        const currUrl = req.url.slice(1);
        getNews(currUrl)
            .then( result => {
                res.send( JSON.stringify({
                    res : result
                }));
            })
    }
})
module.exports = ArticleRouter;

