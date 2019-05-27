var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var mysql = require('mysql')
var config = require('./config')

var connection = mysql.createConnection(config)

var data = []

// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {
    app.get('/',function(req,res) {
        connection.query(`SELECT * FROM todos`, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }  
            data = results;
            console.log(JSON.stringify(results))
            res.render('todo',{todos:results})  
          });
        
    })

    app.get('/todo',function(req,res) {
        connection.query(`SELECT * FROM todos`, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }  
            data = results;
            console.log(JSON.stringify(results))
            res.render('todo',{todos:results})  
          });
           
     })

    app.post('/todo', urlencodedParser, function(req,res) {
        let stmt = `INSERT INTO todos(item)
            VALUES(?)`;
        let todo = req.body.item;
        // execute the insert statment
        connection.query(stmt, todo, (err, results, fields) => {
            if (err) {
            return console.error(err.message);
            }
            data.push(results)
            console.log('After insertion data : ' + JSON.stringify(data))
        });
        res.json(data)
    })

    app.delete('/todo/:item',function(req,res) {
   
            let sql = `DELETE FROM todos WHERE item = ?`;
            let del_item = req.params.item.trim().replace("-",/ /g);
            console.log(del_item + ' : del_item')
            connection.query(sql, del_item ,(error, rows, fields) => {
                if (error) {
                  return console.error(error.message);
                } 
                console.log('After deletion data : ' + JSON.stringify(data))
              res.json(data)  
        })            
    })
}
