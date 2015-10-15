(function () {
    'use strict';

    var SendMoneyController = function (options) {
        this.template = require('raw!../../../templates/sendmoney/index.html');
    };

    SendMoneyController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        $('body').on('click', '.p2pSend', function(){
            console.log("Move To Verifications Tab");
        });

        return this;
    };

    module.exports = SendMoneyController;
})();