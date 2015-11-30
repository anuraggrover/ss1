(function (W, events, utils) {
    'use strict';

    var Keypad = require('../../../util/keyboard');
    
    var Topup1Controller = function (options) {
        this.template = require('raw!../../../../templates/topup/topup1/index.html');
    };

    Topup1Controller.prototype.destroy = function(){
        this.captureKeys.remove();
    };

    Topup1Controller.prototype.bind = function(App, data){
        var display = document.getElementById('p2pValue');
        var form = document.forms[0];
        var check = this.el.getElementsByClassName('action_next')[0];
        var moneyIn = this.el.getElementsByClassName('inActive')[0];
        var currencySymbol = this.el.getElementsByClassName('currencySymbol')[0];

        // If any data exists Fill
        if(data.lowBalance){
            display.value = data.addMoney;
            moneyIn.classList.add('activate');
            check.classList.add('activebutton');
        }

        display.focus();

        form.addEventListener('submit', function(ev){
            ev.preventDefault();

            if (this.classList.contains('activebutton')){
                events.publish('update.loader', { show: true });
                App.router.navigateTo('/addMoney_paymentMethod', { amt: display.value });
            } else { 
                if (platformSdk.bridgeEnabled) PlatformBridge.showToast("Please Enter Amount");
                else console.log("Please Enter Amount.");
            }
        });

        check.addEventListener('click', function(ev){
            if (this.classList.contains('activebutton')){
                events.publish('update.loader', { show: true });
                App.router.navigateTo('/addMoney_paymentMethod', { amt: display.value });
            } else { 
                if (platformSdk.bridgeEnabled) PlatformBridge.showToast("Please Enter Amount");
                else console.log("Please Enter Amount.");
            } 
        });

        var inputMoney = function(ev){
            // TODO :: SHIFT TO CAPTURE KEY
            //events.publish('keypad.key' , String.fromCharCode(ev.which));
            
            // console.log(currencySymbol);

            // currencySymbol.innerHTML = this.value;
            // ev.currentTarget.value = '₹' + this.value;

            if(this.value) {
                moneyIn.classList.add('activate');
                check.classList.add('activebutton');
            }
            else {
                check.classList.remove('activebutton');
                moneyIn.classList.remove('activate');
            }
            
            events.publish('keypad.inputPress', {ctx:this, keyEvent:ev});
        };

        display.addEventListener('keyup', inputMoney);

        this.captureKeys = events.subscribe('keypad.key', function(key){

            if (/[0-9]/.test(key)) {
                if (key.length > 1) display.value = key;
                else display.value = display.value + key;

                events.publish('keypad.deactivateAmount');
                check.classList.add('activebutton');
                moneyIn.classList.add('activate');
            } else if (key === "del") {
                display.value = display.value.substring(0, display.value.length - 1);
                if (display.value.length === 0) {
                    moneyIn.classList.add('activate');
                    check.classList.remove('activebutton');
                }
            }

            display.focus();

        });
    };

    Topup1Controller.prototype.render = function(App, data) {

        this.el = document.createElement('div');
        this.el.className = "topupContainer1 animation_fadein";
        this.el.innerHTML = Mustache.render(this.template);

        new Keypad(this.el);

        App.container.appendChild(this.el);
        events.publish('update.loader', {show:false});   
        this.bind(App,data);
    };

    module.exports = Topup1Controller;
})(window, platformSdk.events, platformSdk.utils);