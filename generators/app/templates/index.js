'use strict';

var mycro = require('./app');
mycro.start(function(err) {
    if (err) {
        mycro.log('error', 'there was an error starting <%= appName %>:', err);
    } else {
        mycro.log('info', '<%= appName %> started successfully');
    }
});
