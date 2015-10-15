(function () {
    'use strict';

    var Ftue2Controller = function (options) {
        this.template = require('raw!../../../../templates/ftue/ftuestep2/index.html');
    };

    Ftue2Controller.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        return this;
    };

    module.exports = Ftue2Controller;
})();