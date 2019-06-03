var bodyParser = require('body-parser')
var mysql = require('mysql')
var config = require('./config')

var connection = mysql.createConnection(config)

var data = [{
    "id": 0,
    "name": '',
    "email": '',
    "msg": '',
}];
var det = {"id":14,"name":"saman","email":"abc@abc.com","msg":"samann"}

// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {
 
    app.post('/contact', urlencodedParser, function(req,res) {
        let stmt = `INSERT INTO contact(name, email, msg)
            VALUES(?,?,?)`;
        let form_details = [req.body.name,req.body.email,req.body.message];
        console.log('form_details: '+form_details)
        // execute the insert statment
        connection.query(stmt, form_details, (err, results, fields) => {
            if (err) {
            return console.error(err.message);
            }
            data.push(results)
            console.log('After insertion data : ' + JSON.stringify(data))
            // res.json(data)
        });
        res.redirect('/contact-success')
        app.get('/contact-success',function(req,res) {
            connection.query(`SELECT * FROM contact WHERE id=(SELECT MAX(id) FROM contact)`, (error, results, fields) => {
                if (error) {
                  return console.error(error.message);
                } 
                data = results; 
                console.log('result: '+JSON.stringify(data))
                res.render('contact-success',{contact_det: data})  
              });
       
         })
    })

  

}
