var bodyParser = require('body-parser')
var mysql = require('mysql')
var multer = require('multer')
var path = require('path')
var config = require('./config')

var connection = mysql.createConnection(config)

var data = [{}];

//Set Storage Engine
var storage = multer.diskStorage({
    destination: './assets/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// initialize upload var
var upload = multer({
    storage:storage
}).single('file')


// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {
 
    app.post('/kaizala_ins_upd', urlencodedParser, function(req,res) {
        upload(req,res,(err) =>{
            if(err){
                res.render('kaizala_ins_upd',{
                    msg: err
                })
            } else {
        let stmt = `INSERT INTO kaizala(k_id, heading, data, img)
            VALUES(?,?,?,?)`;
        let form_details = [null,req.body.heading,req.body.content,"/assets/uploads/"+req.file.filename];
        console.log(req.file)
        console.log('form_details: '+form_details)
        // execute the insert statment
        connection.query(stmt, form_details, (err, results, fields) => {
            if (err) {
            return console.error(err.message);
            }
            data.push(results)
            console.log('After insertion data : ' + JSON.stringify(data))
            // res.json(data)
            res.redirect('/admin')
             });
           }
        })
    })
        app.post('/intrvwqs_ins_upd', urlencodedParser, function(req,res) {
            upload(req,res,(err) =>{
                if(err){
                    res.render('intrvwqs_ins_upd',{
                        msg: err
                    })
                } else {
            let stmt = `INSERT INTO interview_qs(iq_id, iq_ques, iq_ans, img)
                VALUES(?,?,?,?)`;
            let form_details = [null,req.body.Question,req.body.Answer,"/assets/uploads/"+req.file.filename];
            console.log(req.file)
            console.log('form_details: '+form_details)
            // execute the insert statment
            connection.query(stmt, form_details, (err, results, fields) => {
                if (err) {
                return console.error(err.message);
                }
                data.push(results)
                console.log('After insertion data : ' + JSON.stringify(data))
                // res.json(data)
                res.redirect('/admin')
                 });
               }
            })
        })


}
