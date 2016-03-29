const Backbone = require('backbone'),
    AppView = require('./backbone/app/appView'),
    _ = require('lodash');

const vent = _.extend({}, Backbone.Events);

const appView = new AppView({ messages: new Backbone.Collection([
    { title: 'New title 1', name: 'Sean', message: 'Hello' },
    { title: 'New title 2', name: 'Tom', message: 'Hello, world' },
    { title: 'New title 3', name: 'Jack', message: 'Awesome one' },
    { title: 'New title 4', name: 'Bob', message: 'Suit up' },
    { title: 'New title 5', name: 'Cyril', message: 'Lorem ipsum' }
]), vent: vent });

document.querySelector('.app').appendChild(appView.el);
