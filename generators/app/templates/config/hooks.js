'use strict';

module.exports = [
    'server',<% if (options.hooks.indexOf('models & connections') !== -1) { %>
    'connections',
    'models',<% } %><% if (options.hooks.indexOf('services') !== -1) { %>
    'services',<% } %><% if (options.hooks.indexOf('policies') !== -1) { %>
    'policies',<% } %><% if (options.hooks.indexOf('controllers') !== -1) { %>
    'controllers',<% } %><% if (options.hooks.indexOf('routes') !== -1) { %>
    'routes',<% } %>
    'start'
];
