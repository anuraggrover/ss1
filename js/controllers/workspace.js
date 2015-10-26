(function () {
    'use strict';

    var utils = require('../util/utils');
    var paymentServices = require('../util/paymentServices');

    var WorkspaceController = function (options) {
        this.template = require('raw!../../templates/workspace.html');
    };

    WorkspaceController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
            cardbalance: 3000,
            cardexpiry:'10/19'
        }));

        var self = this;
        
        // Send Money Contact Chooser Trigger 
        $('body').on('click', '.sendMoney', function(){
            if (PlatformBridge) {
                // Toggle Back and Up Press 
                utils.toggleBackNavigation(true);
                // Start The Contact Chooser Screen
                PlatformBridge.startContactChooser();
            }
        });

        // Card Flip Sides

        $('body').on('click', '.frontSide', function(e){  
            event.preventDefault();
            $('#side-2').prop('class','walletCard backSide flip-side-1');
            $('#side-1').prop('class','walletCard frontSide flip-side-2');
        });

        $('body').on('click', '.backSide', function(e){    
            event.preventDefault();
            $('#side-2').prop('class','walletCard backSide');
            $('#side-1').prop('class','walletCard frontSide');
        });

        return this;
    };

    module.exports = WorkspaceController;
})();