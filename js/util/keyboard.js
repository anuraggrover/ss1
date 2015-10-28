(function (W, events, utils) {
    'use strict';

    var Keyboard = function (ctr) {
        this.template = require('raw!../../templates/keypad_number.html');
        this.ctr = ctr;
        this.init();
    };

    Keyboard.prototype.destroy = function(){
        events.publish('keypad.destroy');
    };

    Keyboard.prototype.bind = function(){
        var keys = this.el.getElementsByClassName('key');
        
        var fn_key = function(ev){
            events.publish('keypad.key', this.getAttribute('data-val'));
            if (this.classList.contains('amount')){
                events.publish('keypad.activateAmount', this);
            }
        };

        utils.addEventListenerList(keys, 'click', fn_key);

        var ev_deactivateAmount = events.subscribe('keypad.deactivateAmount', function(){
            var amt = document.getElementsByClassName('amount');
            for (var i = 0; i < amt.length; i++){
                amt[i].classList.remove('activeamount');
            }
        });

        var ev_activateAmount = events.subscribe('keypad.activateAmount', function(ctx){
            events.publish('keypad.deactivateAmount');
            ctx.classList.add('activeamount');
        });

        var destroyKeypad = events.subscribe('keypad.destroy', function(){
            ev_activateAmount.remove();
            utils.removeEventListenerList(keys, 'click', fn_key); 
            destroyKeypad.remove();
        });
    };

    Keyboard.prototype.render = function(ctr){
        var html = Mustache.render(this.template, this.tmplObject);

        this.el = document.createElement('div');
        this.el.className = "keypadContainer";
        this.el.innerHTML = html;

        this.ctr.appendChild(this.el);
        this.bind();
    };

    Keyboard.prototype.init = function(){

        this.tmplObject = {
            defaultAmounts: [{ amount:500}, { amount:1000}, { amount:2000}],
            keypad: [
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
                { keypadvalue: '.' }
            ]
        };

        this.render();
    };

    module.exports = Keyboard;
})(window, platformSdk.events, platformSdk.utils);