const Backbone = require('backbone'),
    Hogan = require('hogan'),
    moment = require('moment'),
    fs = require('fs'),
    editMessageFormTemplate = fs.readFileSync(__dirname + '/editMessageFormTemplate.html', 'utf8');

const postMessageFormView = Backbone.View.extend({
    tagName: 'div',
    className: 'edit-message-form gray-layout col-sm-12',
    events: {
        'click .submit-edited-post': 'submitEditedPost'
    },
    initialize: function(options = {}) {
        this.options = options;
        this.render();
    },
    render: function() {
        const template = Hogan.compile(editMessageFormTemplate);

        this.el.innerHTML = template.render(this.options['model'].toJSON());

        return this;
    },
    submitEditedPost: function() {
        const newPostTitle = this.el.querySelector('.newPostTitle').value.trim(),
            newPostName = this.el.querySelector('.newPostName').value.trim(),
            newPostMessage = this.el.querySelector('.newPostMessage').value.trim();

        if (!newPostTitle || !newPostName || !newPostMessage) {
            alert('Please fill all the fields to edit this post.');

            return false;
        }

        this.options['messages'].add(newMessageModel);
    }
});

module.exports = postMessageFormView;
