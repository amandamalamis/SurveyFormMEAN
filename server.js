var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var bodyParser = require('body-parser');

app.use(session({secret: 'thisissecret'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs'); 

// use app's get method and pass it the base route '/' and a callback
app.get('/', function(request, result) {
    result.render("index");
});

app.post('/result', function(request, result) {
    request.session.name = request.body.name;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    request.session.message = request.body.message;

    // request.session.visits++;
    result.render("success", {name: request.session.name, location: request.session.location, language: request.session.language, message: request.session.message});
});

app.get('/success', function(request, result) {
    result.redirect("success");
});



app.listen(8000, function() {
    console.log("listening on port 8000");
})
  
  