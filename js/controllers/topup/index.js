(function () {
    'use strict';

    var IndexController = function (options) {
        this.template = require('raw!../../../templates/topup/index.html');
    };

    IndexController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        return this;
    };

    module.exports = IndexController;
})();