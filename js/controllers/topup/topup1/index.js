(function () {
    'use strict';

    var Topup1Controller = function (options) {
        this.template = require('raw!../../../../templates/topup/topup1/index.html');
    };

    Topup1Controller.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        return this;
    };

    module.exports = Topup1Controller;
})();