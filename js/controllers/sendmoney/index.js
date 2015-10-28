(function () {
    'use strict';

    var SendMoneyController = function (options) {
        this.template = require('raw!../../../templates/sendmoney/index.html');
        this.receiver = 'Hemank Sabharwal';
        this.defaultAmounts = [
                                { amount:500},
                                { amount:1000},
                                { amount:5000}
                            ];
        this.keypad = [
                        { keypadvalue: 1 },
                        { keypadvalue: 2 },
                        { keypadvalue: 3 },
                        { keypadvalue: 4 },
                        { keypadvalue: 5 },
                        { keypadvalue: 6 },
                        { keypadvalue: 7 },
                        { keypadvalue: 8 },
                        { keypadvalue: 9 },
                        { keypadvalue: '.' },
                        { keypadvalue: 0 },
                        { keypadvalue: '.' },
                    ];
    };

    SendMoneyController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
            receiver:this.receiver,
            defaultAmounts:this.defaultAmounts,
            keypad:this.keypad
        }));

        return this;
    };

    module.exports = SendMoneyController;
})();