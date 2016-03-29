var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    orm = require('orm'),
    messageModel = require('./models/messageModel'),
    messageRoutes = require('./routes/messageRoutes');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(orm.express('postgres://postgres:admin@localhost:5432/viralheat_db', {
    define: function(db, models) {
        models.message = messageModel.load(db)
    }
}));

app.get('/', function(req, res) {
    sendTemplate(req, res, 'views/index.html')
});
app.get('/messages', messageRoutes.getMessages);
app.post('/messages', messageRoutes.createMessage);
app.delete('/messages/:id', messageRoutes.deleteMessage);

function sendTemplate(req, res, template) {
    var fileContents = fs.readFileSync(template);

    res.send(fileContents.toString());
}

app.listen(2000);
