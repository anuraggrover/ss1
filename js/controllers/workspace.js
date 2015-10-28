(function (W) {
    'use strict';

    var utils = require('../util/utils');
    // var PaymentServices = require('../util/paymentServices');

    var WorkspaceController = function (options) {
        this.template = require('raw!../../templates/workspace.html');
    };

    WorkspaceController.prototype.bind = function(){
        var $el = $(this.el);
        var card = document.getElementsByClassName('cardImage')[0];

        $el.on('click', '.sendMoney', function(){
            if (PlatformBridge) {
                // Toggle Back and Up Press 
                utils.toggleBackNavigation(true);
                // Start The Contact Chooser Screen
                PlatformBridge.startContactChooser();
            }
        });

        // Card Flip

        // card.addEventListener('click', function(ev){
        //     ev.preventDefault();
        //     this.classList.toggle('flip');
        // });
    };

    WorkspaceController.prototype.render = function(ctr, App, data) {

        var that = this;

        if (data != undefined){
            that.el = document.createElement('div');
            that.el.className = "walletContainer";
            that.el.innerHTML = Mustache.render(that.template, {
                cardbalance: "100000",  // data.payload.walletBalance
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
                
                ctr.appendChild(that.el);
                that.bind();
            }, this);
        }
    };

    module.exports = WorkspaceController;

})(window);