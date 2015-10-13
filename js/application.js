(function () {
    'use strict';

    var WorkspaceController  = require('./controllers/workspace'),
        TransIndexController = require('./controllers/transactions/index'),
        Router               = require('./util/router');

    var Application = function (options) {
        this.container            = options.container;
        this.router               = new Router();
        this.workspaceController  = new WorkspaceController();
        this.transIndexController = new TransIndexController();
    };

    Application.prototype = {
        start: function () {
            var self = this;
            console.log("Starting application...");

            $('body').on('click', 'a[data-path]', function (e) {
                var path = $(e.currentTarget).attr('data-path');
                if (path === '<<'){
                    self.router.back();
                }
                else {
                    self.router.navigateTo(path);
                }
            });        

            this.router.route('/', function(){
                self.container.html(self.workspaceController.render().el);
            });

            this.router.route('/transactions', function(){
                self.container.html(self.transIndexController.render().el);
            });

            this.router.navigateTo('/');
        }
    };

    module.exports = Application;
})(window);