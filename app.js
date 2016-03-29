var express = require('express'),
    fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    sendTemplate(req, res, 'views/index.html')
});

function sendTemplate(req, res, template) {
    var fileContents = fs.readFileSync(template);

    res.send(fileContents.toString());
}

app.listen(2000);
