(function (W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils');
    
    var _hikeBalance = null; 
    var _store = {};

    var WorkspaceController = function (options) {
        this.template = require('raw!../../templates/workspace.html');
    };

    WorkspaceController.prototype.bind = function(App){
        var $el = $(this.el);
        var card = document.getElementsByClassName('cardImage')[0];
        var walletBalanceEl = this.el.getElementsByClassName('balance_value')[0];
        
        $el.on('click', '.sendMoney', function(){
            if (PlatformBridge) {
                utils.toggleBackNavigation(true);
                //PlatformBridge.startContactChooser();
            }
        });

        $el.on('click', '.walletHistory', function(){
            events.publish('update.loader', {show:true});
            App.router.navigateTo('/transactions', _hikeBalance);
        });

        var walletBalance = events.subscribe('wallet.updateBalance', function(amt){
            walletBalance.innerHTML = amt;
        });

        var destroy = events.subscribe('wallet.destroy', function(){

            walletBalance.remove();
            destroy.remove();
        });

        // card.addEventListener('click', function(ev){
        //     ev.preventDefault();
        //     this.classList.toggle('flip');
        // });
    };

    WorkspaceController.prototype.render = function(ctr, App, data) {

        var that = this;

        events.publish('app.store.get', {
            key: '_wallet',
            ctx: this,
            cb: function(r){
                if (r.status === 1){

                    _hikeBalance = r.results.payload.walletBalance;

                    that.el = document.createElement('div');
                    that.el.className = "walletContainer";
                    that.el.innerHTML = Mustache.render(that.template, {
                        cardbalance: r.results.payload.walletBalance
                    });
                    
                    ctr.appendChild(that.el);
                    events.publish('update.loader', {show:false});
                    that.bind(App);

                    App.PaymentService.fetchBalance(function(res){
                        if (_hikeBalance != res.payload.walletBalance){
                            _hikeBalance = res.payload.walletBalance;
                            events.publish('wallet.updateBalance', _hikeBalance);
                        }
                    });

                } else {
                    App.PaymentService.fetchBalance(function(res){
                        
                        _hikeBalance = res.payload.walletBalance;

                        that.el = document.createElement('div');
                        that.el.className = "walletContainer";

                        that.el.innerHTML = Mustache.render(that.template, {
                            cardbalance: res.payload.walletBalance
                        });

                        events.publish('update.loader', {show:false});
                        ctr.appendChild(that.el);
                        
                        that.bind(App);

                        // save it to store
                        events.publish('app.store.set', {
                            key: '_wallet',
                            value: res,
                            ctx: this,
                            cb: function(r){

                            }
                        });
                    }, this);
                }
            }
        });
    };

    WorkspaceController.prototype.destroy = function(){

    };

    module.exports = WorkspaceController;

})(window, platformSdk, platformSdk.events);