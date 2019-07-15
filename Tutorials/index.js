var express = require('express')
var bodyParser = require('body-parser')
var conController = require('./controllers/conController')
var kaizala_controller = require('./controllers/kaizala_controller')
var admin_controller = require('./controllers/admin_controller')
var intrvwqsControllers = require('./controllers/intrvwqsControllers')

var app = express() //initialize app

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine','ejs')  //setting EJS as view engine
app.use('/assets' , express.static('assets'));

// fire controllers
conController(app)
kaizala_controller(app)
admin_controller(app)
intrvwqsControllers(app)



app.get('/',function(req, res) {
	res.render('index')
})

app.get('/contact', function(req, res) {
	res.render('contact')
})

// app.get('/interview', function(req, res) {
// 	res.render('intrvwqs')
// })

app.get('/admin', function(req, res) {
	res.render('admin')
})

app.get('/kaizala_ins_upd', function(req, res) {
	res.render('kaizala_ins_upd')
})


app.get('/intrvwqs_ins_upd', function(req, res) {
	res.render('intrvwqs_ins_upd')
})
var port = 8084

app.listen(port,function() {
	console.log(`Server started on ${port}`)
})
