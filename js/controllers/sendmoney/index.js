(function (W, events, utils) {
    'use strict';
    
    //var Keypad = require('../../util/keyboard');

    var SendMoneyController = function (options) {
        this.template = require('raw!../../../templates/sendmoney/index.html');
    };

    SendMoneyController.prototype.destroy = function(){
        //this.captureKeys.remove();
    };

    SendMoneyController.prototype.bind = function(App){
        
        var that = this;
        var display = document.getElementById('p2pValue');
        var check = this.el.getElementsByClassName('action_send_money')[0];
        var moneyIn = this.el.getElementsByClassName('inActive')[0];
        var p2pMessage = document.getElementById('p2pComment');
        var wBalance = document.getElementById('wBalance');
        var addAlert = this.el.getElementsByClassName('addMoneyAlert')[0];
        var balAlert = this.el.getElementsByClassName('availBalance')[0];
            
        display.focus();

        check.addEventListener('click', function(ev){
            if (this.classList.contains('activebutton')){
                that.data.amount = parseInt(display.value);
                that.data.message = p2pMessage.value;
                events.publish('update.loader', {show:true});
                App.PaymentService.fundsTransfer(that.data, function(res){   
                    if (res.payload){
                        res.contact = that.data.contact;
                        App.router.navigateTo('/txConfirmation', res);
                        // App.router.navigateTo('/', res);
                    } else {
                        console.log(res);
                        //App.router.navigateTo('/topup1');
                    }
                }, this);
            } else {
                if (platformSdk.bridgeEnabled) PlatformBridge.showToast("Please Enter Amount.");
                else console.log("Please Enter Amount.");
            } 
        });

        // Add Money Alert Shortcut
        addAlert.addEventListener('click', function(ev){
            // Route To Toup 1 with Filled Value
            App.router.navigateTo('/topup1', {lowBalance:true,addMoney:parseInt(display.value) - parseInt(wBalance.getAttribute('data-balance'))} );
        });

        var act = events.subscribe('input.activate', function(){
            check.classList.add('activebutton');
            moneyIn.classList.add('activate');
            moneyIn.classList.remove('activatelowbalance');
            addAlert.classList.remove('showAlert');
            balAlert.classList.remove('hideAlert');
        });

        var deact = events.subscribe('input.deactivate', function(){
            check.classList.remove('activebutton');
            moneyIn.classList.remove('activate');
            moneyIn.classList.add('activatelowbalance');
            addAlert.classList.add('showAlert');
            balAlert.classList.add('hideAlert');
        });

        var inputMoney = function(ev){

            var b = wBalance.getAttribute('data-balance');
            
            if(ev.which == 8) {
                wBalance.innerHTML = '₹'+' '+ (b-this.value);
                if(parseInt(this.value) > parseInt(b)){
                    events.publish('input.deactivate');
                }
                else{
                    events.publish('input.activate');
                }
                return;
            }

            var digit;
            digit = String.fromCharCode(ev.which);      // Number Always Else The Key Code
            
            if (!/^\d+$/.test(digit)) {
                this.value = this.value.replace(/\D/g, '');     // Actual Length 
                return;
            }

            if(this.value) {
                wBalance.innerHTML = '₹'+' '+ (b-this.value);
                if(parseInt(this.value) > parseInt(b)){
                    events.publish('input.deactivate');
                }
                else{
                    events.publish('input.activate');
                }
            }
            else {
                moneyIn.classList.remove('activatelowbalance');
                check.classList.remove('activebutton');
                moneyIn.classList.remove('activate');
            }            
        };

        // Input Events
        display.addEventListener('keyup', inputMoney);
    
    };

    SendMoneyController.prototype.render = function(ctr, App, data) {

        this.data = data;
        this.el = document.createElement('div');
        this.el.className = "p2pContainer";
        this.el.innerHTML = Mustache.render(this.template, { receiver: data.contact.name, availBalance:data.walletAvailBalance});

        //new Keypad(this.el);

        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App);
    };

    module.exports = SendMoneyController;

})(window, platformSdk.events, platformSdk.utils);