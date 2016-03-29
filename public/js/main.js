const Backbone = require('backbone'),
    AppView = require('./backbone/app/appView');

const appView = new AppView({ messages: new Backbone.Collection() });

document.querySelector('.app').appendChild(appView.el);
