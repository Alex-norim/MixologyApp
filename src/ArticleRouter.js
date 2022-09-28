const express = require('express');
const ArticleRouter = express.Router();


// 
const getHighRatingArticle = async () => {
    const mysql = require('mysql2');
    const mysqlConfig = require('./connection/mysql_connection');
    const connection = mysql.createConnection(mysqlConfig).promise();
    const sql = `SELECT text,author,articlename FROM articles ORDER BY rating LIMIT 1`
    return await connection.execute(sql)
        .then( ([row, fields]) => {
            connection.end();   
            return row;
        })
        .catch( err => {
            return false;
        })
}
const ArticleCategoryes = async () => {
    const mysql = require('mysql2');
    const mysqlConfig = require('./connection/mysql_connection');
    const connection = mysql.createConnection(mysqlConfig).promise();
    const SqlRequest = `SELECT category FROM articles_category`;

    return await connection.execute(SqlRequest)
        .then( ([row, fields]) => {
            connection.end();            
            return row.map( obj => obj.category )
        })
        .catch( err => {
            return false
        })
}
// middleware functions
ArticleRouter.use( async (req,res,next) => {
    let  articles = '';
    await  ArticleCategoryes().then( result => { articles = result }).catch(err=>{throw err});
    req.ArticlesArray = articles;
    next();
})
// common requests
ArticleRouter.get("/" , (req,res) => {
    // console.log(req.ArticlesArray)
    res.render('article' , {
        layout : 'layout.hbs',
        category : req.ArticlesArray
    });
});
ArticleRouter.post('/' , (req,res) => {
    const isLayout = req.body.layout;
    res.render('article' ,{
        layout: isLayout,
        category : req.ArticlesArray
    })
})
ArticleRouter.get('/get_highest_article' , (req, res) => {
    getHighRatingArticle()
        .then( result => {
            res.send(JSON.stringify({
                response : result
            }))
        })
    
})
ArticleRouter.get(/[a-z]/ , (req,res) => {
    const getNews = async (topic) => {
        const mysql = require('mysql2');
        const mysqlConfig = require('./connection/mysql_connection');
        const SqlRequest = `SELECT text,author,articlename FROM articles WHERE category='${topic}'`;
        const connection = mysql.createConnection(mysqlConfig).promise();
        return await connection.execute(SqlRequest).then( ([row,field]) => { connection.end() ; return row} ).catch( err=> ['server not found']);
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

