(function () {
    'use strict';

    var Ftue1Controller = function (options) {
        this.template = require('raw!../../../../templates/ftue/ftuestep1/index.html');
    };

    Ftue1Controller.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        return this;
    };

    module.exports = Ftue1Controller;
})();