(function (W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');
    var hikeBalance = null;
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

        $el.on('click', '.walletHistory', function(){
            events.publish('update.loader', {show:true});
            App.router.navigateTo('/transactions',hikeBalance);
        });

        // Card Flip

        // card.addEventListener('click', function(ev){
        //     ev.preventDefault();
        //     this.classList.toggle('flip');
        // });
    };

    var loadObject = events.subscribe('update.loader', function(params){
        loader.toggleClass('loading', params.show);
    });

    WorkspaceController.prototype.render = function(ctr, App, data) {

        var that = this;

        if (data !== undefined){
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

                hikeBalance = res.payload.walletBalance;
                
                that.el = document.createElement('div');
                that.el.className = "walletContainer";

                that.el.innerHTML = Mustache.render(that.template, {
                    cardbalance: res.payload.walletBalance,
                    cardexpiry:'10/19'
                });

                events.publish('update.loader', {show:false});

                // if(platformSdk.isDevice){
                //     PlatformBridge.putInCache('walletBalance',res.payload.walletBalance);    
                //  }
                // else{
                //     localStorage.setItem('walletBalance', res.payload.walletBalance);
                // }
                
                ctr.appendChild(that.el);
                that.bind(App);
            }, this);
        }
    };

    module.exports = WorkspaceController;

})(window, platformSdk, platformSdk.events);