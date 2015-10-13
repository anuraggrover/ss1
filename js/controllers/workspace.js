(function () {
    'use strict';

    var WorkspaceController = function (options) {
        this.template = require('raw!../../templates/workspace.html');
    };

    WorkspaceController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
            balance: 3000
        }));

        var self = this;
        
        $('body').on('click', '.sendMoney', function(){
            if (PlatformBridge) PlatformBridge.startContactChooser();
        });
        
        return this;
    };

    module.exports = WorkspaceController;
})();