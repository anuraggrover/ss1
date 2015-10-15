(function () {
    'use strict';
    
    var WorkspaceController  = require('./controllers/workspace'),
        TransIndexController = require('./controllers/transactions/index'),
        SendMoneyController  = require('./controllers/sendmoney/index'),
        Router               = require('./util/router'),
        TopupController      = require('./controllers/topup/index'),
        utils                = require('./util/utils');
        
    var Application = function (options) {
        this.container            = options.container;
        this.router               = new Router();
        this.workspaceController  = new WorkspaceController();
        this.transIndexController = new TransIndexController();
        this.topupController      = new TopupController();
        this.sendMoneyController  = new SendMoneyController();

        // Global Function Wirtten To Handle The Return From The Contact Chooser 

    window.onContactChooserResult = function(resultCode,contacts) {
        
        // var Router = require('./util/router');
        // var SendMoneyController  = require('./controllers/sendmoney/index');
        
        // var r_new = new Router();
        // var s_new = new TopupController();

        // r_new.route('/topup', function(){
        //     $("#container").html(s_new.render().el);
        // });

        console.log("Repsonse Received From Contacts Chooser");
        // Result code 1 - Success Call
        if(resultCode === 0){
            console.log("Failed::Add Exception");
        }
        //Result Code 1 :: Success 
         else{
            console.log("Success Response:: Routing To p2p ,Transfer");
            console.log(contacts);
            //r_new.navigateTo('topup');
        }
        // Data In Response
        //[{"platformUid":"VgOlRuSwFYYsYe9i","thumbnail":"file:////data/data/com.bsb.hike/cache/+919643474249.jpg","name":"+919643474249"}]
        };
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

            this.router.route('/sendmoney', function(){
                self.container.html(self.sendMoneyController.render().el);
            });

            this.router.navigateTo('/');
        }
    };

    module.exports = Application;

})(window);