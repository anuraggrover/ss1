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
        
        var that = this;
        var display = document.getElementById('p2pValue');
        var check = this.el.getElementsByClassName('action_next')[0];

        display.focus();

        check.addEventListener('click', function(ev){
            if (this.classList.contains('activebutton')){
                that.data.amount = parseInt(display.value);
                App.PaymentService.fundsTransfer(that.data, function(res){   
                    if (res.payload){
                        res.contact = that.data.contact;
                        App.router.navigateTo('/txConfirmation', res);
                        // App.router.navigateTo('/', res);
                    } else {
                        console.log(res);
                        App.router.navigateTo('/topup1');
                    }
                }, this);
            } else {
                if (platformSdk.bridgeEnabled) PlatformBridge.showToast("Please Enter Amount.");
                else console.log("Please Enter Amount.");
            } 
        });

        var inputMoney = function(ev){
            // TODO :: SHIFT TO CAPTURE KEY
            //events.publish('keypad.key' , String.fromCharCode(ev.which));

            if(this.value) check.classList.add('activebutton');
            else check.classList.remove('activebutton');
            
            events.publish('keypad.inputPress', {ctx:this, keyEvent:ev});
        };

        // Input Events
        display.addEventListener('keyup', inputMoney);
    
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

    SendMoneyController.prototype.render = function(ctr, App, data) {

        this.data = data;
        this.el = document.createElement('div');
        this.el.className = "p2pContainer";
        this.el.innerHTML = Mustache.render(this.template, { receiver: data.contact.name });

        new Keypad(this.el);

        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App);
    };

    module.exports = SendMoneyController;

})(window, platformSdk.events, platformSdk.utils);