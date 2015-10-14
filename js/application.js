(function () {
    'use strict';
    
    var WorkspaceController  = require('./controllers/workspace'),
        TransIndexController = require('./controllers/transactions/index'),
        Router               = require('./util/router'),
        TopupController      = require('./controllers/topup/index'),
        utils                = require('./util/utils');
        
        
    var Application = function (options) {
        this.container            = options.container;
        this.router               = new Router();
        this.workspaceController  = new WorkspaceController();
        this.transIndexController = new TransIndexController();
        this.topupController      = new TopupController();
    };

    Application.prototype = {    

        // Back Press Trigger For Back and Up Press
        backPressTrigger: function() {
            this.router.back();            
        },

        start: function () {

            var self = this;
            console.log("Starting application...");

            // Sets False To Give Control Back To Android App
            utils.toggleBackNavigation(false);
            platformSdk.events.subscribe('onBackPressed', self.backPressTrigger.bind(self));
            platformSdk.events.subscribe('onUpPressed', self.backPressTrigger.bind(self));

            $('body').on('click', 'a[data-path]', function (e) {
                var path = $(e.currentTarget).attr('data-path');
                if (path === '<<'){
                    self.router.back();
                }
                else {
                    // Sets The Control To Micro App To Route Back EveryTime Navigating To Some Other Page 
                    utils.toggleBackNavigation(true);
                    self.router.navigateTo(path);
                }
            });        

            this.router.route('/', function(){
                self.container.html(self.workspaceController.render().el);
            });

            this.router.route('/transactions', function(){
                self.container.html(self.transIndexController.render().el);
            });

            this.router.route('/topup', function(){
                self.container.html(self.topupController.render().el);
            });

            this.router.navigateTo('/');
        }
    };

    module.exports = Application;

})(window);