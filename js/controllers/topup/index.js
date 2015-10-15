(function () {
    'use strict';

    var TopupController = function (options) {
        this.template = require('raw!../../../templates/topup/index.html');
    };

    TopupController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        return this;
    };

    module.exports = TopupController;
})();