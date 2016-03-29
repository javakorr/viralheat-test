const Backbone = require('backbone'),
    AppView = require('./backbone/app/appView');

const appView = new AppView();

document.querySelector('.app').appendChild(appView.el);
