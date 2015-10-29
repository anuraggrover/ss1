(function (W, events, utils) {
    'use strict';
    
    var Keypad = require('../../util/keyboard');

    var SendMoneyController = function (options) {
        this.template = require('raw!../../../templates/sendmoney/index.html');
    };

    SendMoneyController.prototype.destroy = function(){
        this.captureKeys.remove();
    };

    SendMoneyController.prototype.bind = function(App){
        
        var display = document.getElementById('p2pValue');
        var check = this.el.getElementsByClassName('action_next')[0];

        check.addEventListener('click', function(ev){
            if (this.classList.contains('activebutton')){
                  var data = {
                    uid:"VVCqo-SwSQ-Z-csS",
                    currency: "INR",
                    amount: display.value,
                    message: "Funds Transfer"
                };
                App.PaymentService.fundsTransfer(data, function(res){
                    App.router.navigateTo('/', res);
                }, this);
            } 
        });

        this.captureKeys = events.subscribe('keypad.key', function(key){
            if (/[0-9]/.test(key)) {
                if (key.length > 1) display.value = key;
                else display.value = display.value + key;

                events.publish('keypad.deactivateAmount');
                check.classList.add('activebutton');
            } else if (key === "del") {
                display.value = display.value.substring(0, display.value.length - 1);
                if (display.value.length === 0) check.classList.remove('activebutton');
            }
        });
    };

    SendMoneyController.prototype.render = function(ctr, App) {

        this.el = document.createElement('div');
        this.el.className = "p2pContainer";
        this.el.innerHTML = Mustache.render(this.template, { receiver: 'Dummy User' });

        new Keypad(this.el);

        ctr.appendChild(this.el);
        this.bind(App);
    };

    module.exports = SendMoneyController;
})(window, platformSdk.events, platformSdk.utils);