'use strict';

var generators = require('yeoman-generator'),
    path = require('path'),
    _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.argument('appName', {type: String, required: true});
        this.option('async', {
            desc: 'include async.js as dependency',
            alias: 'a',
            type: Boolean,
            defaults: false,
        });
        this.option('joi', {
            desc: 'include joi.js as dependency',
            alias: 'j',
            type: Boolean,
            defaults: false
        });
        this.option('lodash', {
            desc: 'include lodash.js as dependency',
            alias: 'l',
            type: Boolean,
            defaults: false
        });
        this.appName = _.kebabCase(this.appName);
    },

    prompting: {
        setAppName: function () {
            var oldRoot = this.destinationRoot();
            if (path.basename(oldRoot) !== this.appName) {
                this.destinationRoot(path.join(oldRoot, this.appName));
            }
        },

        hooks() {
            if (this.options.hooks) {
                return true;
            }

            var done = this.async(),
                prompt = [{
                    type: 'checkbox',
                    message: 'Select hooks',
                    name: 'hooks',
                    choices: [
                        {name: 'controllers'},
                        {name: 'models & connections'},
                        {name: 'policies'},
                        {name: 'routes'},
                        {name: 'services'}
                    ]
                }];

            this.prompt(prompt, response => {
                this.options.hooks = response.hooks;
                done();
            });
        }
    },

    writing() {
        this.directory('.', '.');
        this.fs.copy(
            this.templatePath('**/.*'),
            this.destinationRoot()
        );

        ['async', 'joi', 'lodash'].forEach(dep => {
            if (this[dep]) {
                this.npmInstall([dep], {save: true});
            }
        });

        this.npmInstall();
    }
});
