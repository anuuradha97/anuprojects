var bodyParser = require('body-parser')
var mysql = require('mysql')
var config = require('./config')

var connection = mysql.createConnection(config)


module.exports = function(app) {
 
        app.get('/kaizala',function(req,res) {
            connection.query(`SELECT k_id, heading FROM kaizala`, (error, results, fields) => {
                if (error) {
                  return console.error(error.message);
                }  
                console.log('result: '+JSON.stringify(results))
                // res.json(results)
                res.render('partials/headingKaizala',{kaizala_data: results})  
              });
       
         })

         app.get('/kaizala/:id',function(req, res) {
          let stmt = `SELECT * FROM kaizala WHERE k_id=?`;
          let iD = req.params.id;
          connection.query(stmt, iD, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }  
            console.log('result: '+JSON.stringify(results))
            // res.json(results)
            console.log(req.params.id)
            res.render('kaizala',{iD: req.params.id,kaizala_data: results})  
          });
      
      })
    

  

}