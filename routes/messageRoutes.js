var _ = require('lodash');

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

exports.updateMessage = function(req, res) {
    var updatedMessageId = req.params.id,
        updatedMessageBody = req.body;

    req.models.message.all(function(error, messages) {
        if (error) throw error;

        var messageToUpdate = _.find(messages, { id: updatedMessageId });

        if (!_.isUndefined(messageToUpdate)) {
            if (messageToUpdate.title !== updatedMessageBody.title) {
                messageToUpdate.title = updatedMessageBody.title;
            }

            if (messageToUpdate.name !== updatedMessageBody.name) {
                messageToUpdate.name = updatedMessageBody.name;
            }

            if (messageToUpdate.message !== updatedMessageBody.message) {
                messageToUpdate.message = updatedMessageBody.message;
            }

            messageToUpdate.save(function(error) {
                if (error) throw error;

                res.send(messageToUpdate);
                res.end();
            });
        }
    });
};

exports.deleteMessage = function(req, res) {
    var deletedMessageId = req.params.id;

    req.models.message.all(function(error, messages) {
        if (error) throw error;

        var messageToDelete = _.find(messages, { id: deletedMessageId });

        if (!_.isUndefined(messageToDelete)) {
            messageToDelete.remove();
        }

        res.sendStatus(200);
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
