(function () {
    'use strict';

    var WorkspaceController = function (options) {
        this.template = require('raw!../../templates/workspace.html');
    }

    WorkspaceController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
            balance: 1000
        }));

        return this;
    };

    module.exports = WorkspaceController;
})();