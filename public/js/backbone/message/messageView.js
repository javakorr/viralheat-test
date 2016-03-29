const Backbone = require('backbone'),
    Hogan = require('hogan'),
    fs = require('fs'),
    messageTemplate = fs.readFileSync(__dirname + '/messageTemplate.html', 'utf8');

const messageView = Backbone.View.extend({
    tagName: 'div',
    className: 'message row',
    events: {},
    initialize: function() {
        this.render();
    },
    render: function() {
        const template = Hogan.compile(messageTemplate),
            output = template.render(this.model.toJSON());

        this.$el.html(output);
        
        return this;
    }
});

module.exports = messageView;
