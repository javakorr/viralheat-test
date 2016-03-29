const Backbone = require('backbone'),
    Hogan = require('hogan'),
    moment = require('moment'),
    MessageModel = require('./../message/messageModel'),
    fs = require('fs'),
    postMessageFormTemplate = fs.readFileSync(__dirname + '/postMessageFormTemplate.html', 'utf8');

const postMessageFormView = Backbone.View.extend({
    tagName: 'div',
    className: 'post-message-form gray-layout col-sm-12',
    events: {
        'click .submit-new-post': 'submitNewPost'
    },
    initialize: function(options = {}) {
        this.options = options;
        this.render();
    },
    render: function() {
        const template = Hogan.compile(postMessageFormTemplate);

        this.el.innerHTML = template.render();

        return this;
    },
    submitNewPost: function() {
        const newPostTitle = this.el.querySelector('.newPostTitle').value.trim(),
            newPostName = this.el.querySelector('.newPostName').value.trim(),
            newPostMessage = this.el.querySelector('.newPostMessage').value.trim(),
            newPostDate = moment().format('MMMM, D YYYY @ h:mm a');

        if (!newPostTitle || !newPostName || !newPostMessage) {
            alert('Please fill all the fields to submit a new post.');

            return false;
        }

        const newMessageModel = new MessageModel({
            title: newPostTitle,
            name: newPostName,
            message: newPostMessage,
            date: newPostDate
        });

        this.options['messages'].add(newMessageModel);
    }
});

module.exports = postMessageFormView;
