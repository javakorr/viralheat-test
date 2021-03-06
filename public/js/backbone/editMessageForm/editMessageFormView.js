const Backbone = require('backbone'),
    Hogan = require('hogan.js'),
    moment = require('moment'),
    fs = require('fs'),
    editMessageFormTemplate = fs.readFileSync(__dirname + '/editMessageFormTemplate.html', 'utf8');

const postMessageFormView = Backbone.View.extend({
    tagName: 'div',
    className: 'edit-message-form gray-layout col-sm-12',
    events: {
        'click .submit-edited-post': 'submitEditedPost',
        'click .delete-edited-post': 'deleteEditedPost'
    },
    initialize: function(options) {
        this.options = options || {};
        this.render();
    },
    render: function() {
        const template = Hogan.compile(editMessageFormTemplate);

        this.el.innerHTML = template.render(this.options.message.toJSON());

        return this;
    },
    submitEditedPost: function() {
        const self = this;

        const element = self.el,
            editedPostTitle = element.querySelector('.postTitle').value.trim(),
            editedPostName = element.querySelector('.postName').value.trim(),
            editedPostMessage = element.querySelector('.postMessage').value.trim();

        if (!editedPostTitle || !editedPostName || !editedPostMessage) {
            alert('Please fill all the fields to edit this post.');

            return false;
        }

        self.options.message.save(
            {
                title: editedPostTitle,
                name: editedPostName,
                message: editedPostMessage
            },
            {
                patch: true,
                success: function(response) {
                    self.options.vent.trigger('app:submitEditedMessage', response);
                }
            }
        );
    },
    deleteEditedPost: function() {
        this.options.message.destroy();
        this.options.vent.trigger('app:deleteEditedMessage');
    }
});

module.exports = postMessageFormView;
