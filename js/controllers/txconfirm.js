(function (W, events, utils) {
    'use strict';

    var TxConfirm = function (options) {
        this.template = require('raw!../../templates/txConfirm.html');
    };

    TxConfirm.prototype.destroy = function(){

    };

    TxConfirm.prototype.bind = function(App){
        
        var that = this;
    };

    TxConfirm.prototype.render = function(ctr, App, data) {

        this.data = data;
        this.el = document.createElement('div');
        this.el.className = "confirmationMessage";
        this.el.innerHTML = Mustache.render(this.template, data);

        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App);
    };

    module.exports = TxConfirm;

})(window, platformSdk.events, platformSdk.utils);