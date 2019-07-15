var bodyParser = require('body-parser')
var mysql = require('mysql')
var config = require('./config')
var htmlToText = require('html-to-text');

var connection = mysql.createConnection(config)

// var data = [{
//     "iq_id": 0,
//     "iq_ques": '',
//     "iq_ans": '',
    
// }];
// var det = {"iq_id":14,"iq_ques":"saman","iq_ans":"abc@abc.com"}

// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {
 
    
        app.get('/intrvwqs',function(req,res) {
         var text =  htmlToText.fromString(connection.query(`SELECT * FROM interview_qs`, (error, results, fields) => {
                if (error) {
                  return console.error(error.message);
                } 
                // data = results; 
               
                //console.log('result: '+JSON.stringify(results))
                res.render('intrvwqs',{dataa: results})  
              })
            );
         })
        }

        