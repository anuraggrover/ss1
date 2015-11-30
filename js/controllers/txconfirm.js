(function (W, events, utils) {
    'use strict';

    var TxConfirm = function (options) {
        this.template = require('raw!../../templates/txConfirm.html');
    };

    TxConfirm.prototype.destroy = function(){

    };

    TxConfirm.prototype.bind = function(App, res){
        var that = this;

        var backToHome = this.el.getElementsByClassName('confirm_tx_done')[0];
        
        backToHome.addEventListener('click', function(ev){
            console.log("Routing Back To Home");
            App.router.navigateTo('/', res);
        });

    };

    TxConfirm.prototype.render = function(ctr, App, data) {

        this.data = data.payload.statement;
        this.el = document.createElement('div');
        this.el.className = "confirmationMessage animation_fadein";
        this.el.innerHTML = Mustache.render(this.template, { tName:this.data.transactionMessage, tAmount:this.data.amount, tId:this.data.statementId, tDate:this.data.transactionDate });


        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App, data);
    };

    module.exports = TxConfirm;

})(window, platformSdk.events, platformSdk.utils);