(function () {
    'use strict';

    var Ftue4Controller = function (options) {
        this.template = require('raw!../../../../templates/ftue/ftuestep4/index.html');
    };

    Ftue4Controller.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        return this;
    };

    module.exports = Ftue4Controller;
})();