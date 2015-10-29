(function (W, platformSdk) {
    'use strict';

    var utils = require('../util/utils');
    // var PaymentServices = require('../util/paymentServices');

    var WorkspaceController = function (options) {
        this.template = require('raw!../../templates/workspace.html');
    };

    WorkspaceController.prototype.bind = function(App){
        var $el = $(this.el);
        var card = document.getElementsByClassName('cardImage')[0];
        
        $el.on('click', '.sendMoney', function(){
            if (PlatformBridge) {
                utils.toggleBackNavigation(true);
                //PlatformBridge.startContactChooser();
            }
        });
        
        // Card Flip

        // card.addEventListener('click', function(ev){
        //     ev.preventDefault();
        //     this.classList.toggle('flip');
        // });
    };

    WorkspaceController.prototype.render = function(ctr, App, data) {

        console.log(data);
        var that = this;

        if (data != undefined){
            that.el = document.createElement('div');
            that.el.className = "walletContainer";
            that.el.innerHTML = Mustache.render(that.template, {
                cardbalance: data.payload.walletBalance,
                cardexpiry:'10/19'
            });
            
            ctr.appendChild(that.el);
            that.bind();
        } else {
            App.PaymentService.fetchBalance(function(res){
                that.el = document.createElement('div');
                that.el.className = "walletContainer";
                that.el.innerHTML = Mustache.render(that.template, {
                    cardbalance: res.payload.walletBalance,
                    cardexpiry:'10/19'
                });

                if(platformSdk.isDevice){
                PlatformBridge.putInCache('walletBalance',res.payload.walletBalance);    
                }
                else{
                    localStorage.setItem('walletBalance', res.payload.walletBalance);
                }
                
                ctr.appendChild(that.el);
                that.bind(App);
            }, this);
        }
    };

    module.exports = WorkspaceController;

})(window, platformSdk);