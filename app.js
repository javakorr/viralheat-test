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

app.use(orm.express(process.env.DATABASE_URL, {
    define: function(db, models) {
        models.message = messageModel.load(db)
    }
}));

app.get('/', function(req, res) {
    sendTemplate(req, res, 'views/index.html')
});
app.get('/messages', messageRoutes.getMessages);
app.post('/messages', messageRoutes.createMessage);
app.patch('/messages/:id', messageRoutes.updateMessage);
app.delete('/messages/:id', messageRoutes.deleteMessage);

function sendTemplate(req, res, template) {
    var fileContents = fs.readFileSync(template);

    res.send(fileContents.toString());
}

app.listen(process.env.PORT || 8000);
