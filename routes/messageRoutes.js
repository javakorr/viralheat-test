exports.getMessages = function(req, res) {
    req.models.message.all(function(error, messages) {
        if (error) throw error;
        
        res.send(messages);
        res.end();
    });
};

exports.createMessage = function(req, res) {
    var newMessage = req.body;

    req.models.message.create({
        id: generateMessageId(),
        title: newMessage.title,
        name: newMessage.name,
        message: newMessage.message,
        date: newMessage.date
    }, function(error, messages) {
        if (error) throw error;

        res.send(messages);
        res.end();
    });
};

function generateMessageId() {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }

    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}
