'use strict';

var yeoman = require('yeoman-generator'),
    _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
    constructor() {
        yeoman.generators.Base.apply(this, arguments);
        this.argument('appname', {type: String, required: true});
        this.option('async', {
            desc: 'include async.js as dependency',
            alias: 'a',
            type: Boolean,
            defaults: true,
        });
        this.option('joi', {
            desc: 'include joi.js as dependency',
            alias: 'j',
            type: Boolean,
            defaults: true
        });
        this.option('lodash', {
            desc: 'include lodash.js as dependency',
            alias: 'l',
            type: Boolean,
            defaults: true
        });
        this.appname = _.kebabCase(this.appname);
    },

    prompting: {
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

    }
});
