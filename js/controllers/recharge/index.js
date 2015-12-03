(function (W, events, utils) {
    'use strict';

    var RechargeController = function (options) {
        this.template = require('raw!../../../templates/recharge/index.html');
    };

    RechargeController.prototype.destroy = function(){
        
    };

    RechargeController.prototype.bind = function(App, data){

    };

    RechargeController.prototype.render = function(App, data) {

        this.el = document.createElement('div');
        this.el.className = "rechargeContainer animation_fadein";
        this.el.innerHTML = Mustache.render(this.template);

        App.container.appendChild(this.el);
        //events.publish('update.loader', {show:false});   
        this.bind(App,data);
    };

    module.exports = RechargeController;
})(window, platformSdk.events, platformSdk.utils);