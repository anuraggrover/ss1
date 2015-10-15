(function () {
    'use strict';

    var utils                = require('../util/utils');

    var WorkspaceController = function (options) {
        this.template = require('raw!../../templates/workspace.html');
    };

    WorkspaceController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
            balance: 3000
        }));

        var self = this;
        
        $('body').on('click', '.sendMoney', function(){
            if (PlatformBridge) {
                // Toggle Back and Up Press 
                utils.toggleBackNavigation(true);
                // Start The Contact Chooser Screen
                PlatformBridge.startContactChooser();
            }
        });
        
        return this;
    };

    module.exports = WorkspaceController;
})();