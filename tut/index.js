var express = require('express')
var bodyParser = require('body-parser')
var conController = require('./controllers/conController')

var app = express()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine','ejs')
app.use('/assets' , express.static('assets'));
// fire controllers
conController(app)

app.get('/',function(req, res) {
	res.render('index')
})

app.get('/contact', function(req, res) {
	res.render('contact')
})

app.listen(8085,function() {
	console.log('Started')
})
