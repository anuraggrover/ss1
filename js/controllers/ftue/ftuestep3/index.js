(function () {
    'use strict';

    var Ftue3Controller = function (options) {
        this.template = require('raw!../../../../templates/ftue/ftuestep3/index.html');
    };

    Ftue3Controller.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        return this;
    };

    module.exports = Ftue3Controller;
})();