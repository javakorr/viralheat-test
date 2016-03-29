const Backbone = require('backbone'),
    Hogan = require('hogan'),
    fs = require('fs'),
    postMessageFormTemplate = fs.readFileSync(__dirname + '/postMessageFormTemplate.html', 'utf8');

const postMessageFormView = Backbone.View.extend({
    tagName: 'div',
    className: 'post-message-form col-sm-12',
    events: {},
    initialize: function() {
        this.render();
    },
    render: function() {
        const template = Hogan.compile(postMessageFormTemplate);

        this.el.innerHTML = template.render();

        return this;
    }
});

module.exports = postMessageFormView;
