(function (W, events, utils) {
    'use strict';

    var Keypad = require('../../../util/keyboard');
    
    var Topup1Controller = function (options) {
        this.template = require('raw!../../../../templates/topup/topup1/index.html');
    };

    Topup1Controller.prototype.destroy = function(){
        this.captureKeys.remove();
    };

    Topup1Controller.prototype.bind = function(App){
        var display = document.getElementById('p2pValue');
        var check = this.el.getElementsByClassName('action_next')[0];
        
        display.focus();

        check.addEventListener('click', function(ev){
            if (this.classList.contains('activebutton')){
                
                events.publish('update.loader', {show:true});
                
                App.TopupService.getPaymentOptions(function(res){
                    App.router.navigateTo('/topup2', { amt: display.value, data:res.payload });
                    events.publish('update.loader', {show:false});    
                }, this);
            } else { 
                if (platformSdk.bridgeEnabled) PlatformBridge.showToast("Please Enter Amount");
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

    Topup1Controller.prototype.render = function(App) {

        this.el = document.createElement('div');
        this.el.className = "topupContainer1 animation_fadein";
        this.el.innerHTML = Mustache.render(this.template);

        new Keypad(this.el);

        App.container.appendChild(this.el);
        events.publish('update.loader', {show:false});
        
        this.bind(App);
    };

    module.exports = Topup1Controller;
})(window, platformSdk.events, platformSdk.utils);