(function () {
    'use strict';
    
    var WorkspaceController  = require('./controllers/workspace'),
        TransIndexController = require('./controllers/transactions/index'),
        SendMoneyController  = require('./controllers/sendmoney/index'),
        Topup1Controller     = require('./controllers/topup/topup1/index'),
        Topup2Controller     = require('./controllers/topup/topup2/index'),
        Ftue1Controller      = require('./controllers/ftue/ftuestep1/index'),
        Ftue2Controller      = require('./controllers/ftue/ftuestep2/index'),
        Ftue3Controller      = require('./controllers/ftue/ftuestep3/index'),
        Ftue4Controller      = require('./controllers/ftue/ftuestep4/index'),
        FtueTourController   = require('./controllers/ftue/ftuetour/index'),
        Router               = require('./util/router'),
        utils                = require('./util/utils'),
        paymentServices      = require('./util/paymentServices'),
        Keyboard             = require('./util/keyboard');

    var Application = function (options) {
        this.container            = options.container;
        this.router               = new Router();
        this.workspaceController  = new WorkspaceController();
        this.transIndexController = new TransIndexController();
        this.topup1Controller     = new Topup1Controller();
        this.topup2Controller     = new Topup2Controller();
        this.sendMoneyController  = new SendMoneyController();
        this.ftuestep1Controller  = new Ftue1Controller();
        this.ftuestep2Controller  = new Ftue2Controller();
        this.ftuestep3Controller  = new Ftue3Controller();
        this.ftuestep4Controller  = new Ftue4Controller();
        this.ftuetourController   = new FtueTourController();

// Global Function Wirtten To Handle The Return From The Contact Chooser 
    
    window.onContactChooserResult = function(resultCode,contacts) {
        
        console.log("Repsonse Received From Contacts Chooser");
        if(resultCode === 0){
            console.log("Failed::Add Exception");
        }
        //Result Code 1 :: Success 
         else{
            console.log("Success Response:: Routing To p2p ,Transfer");
            console.log(contacts);
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
            self.$el = $(this.container);
        
            utils.toggleBackNavigation(false);
            platformSdk.events.subscribe('onBackPressed', self.backPressTrigger.bind(self));
            platformSdk.events.subscribe('onUpPressed', self.backPressTrigger.bind(self));

            $('body').on('click', 'a[data-path]', function (e) {
                var path = $(e.currentTarget).attr('data-path');
                if (path === '<<'){
                    self.router.back();
                }
                else {
                    utils.toggleBackNavigation(true);
                    self.router.navigateTo(path);
                }
            });

            this.router.route('/', function(){
                self.workspaceController.render(self.container);
            });

            this.router.route('/transactions', function(){
                //self.transIndexController.render(self.container);
                self.$el.html(self.transIndexController.render(self.container).el);
            });

            this.router.route('/topup1', function(){
                self.$el.html(self.topup1Controller.render().el);
            });

            this.router.route('/topup2', function(){
                self.$el.html(self.topup2Controller.render().el);
            });

            this.router.route('/sendmoney', function(){
                self.$el.html(self.sendMoneyController.render().el);
            });

            this.router.route('/ftue_step_1', function(){
                self.$el.html(self.ftuestep1Controller.render().el);
            });

            this.router.route('/ftue_step_2', function(){
                self.$el.html(self.ftuestep2Controller.render().el);
            });

            this.router.route('/ftue_step_3', function(){
                self.$el.html(self.ftuestep3Controller.render().el);
            });

            this.router.route('/ftue_step_4', function(){
                self.$el.html(self.ftuestep4Controller.render().el);
            });

            this.router.route('/ftue_tour', function(){
                self.$el.html(self.ftuetourController.render().el);
            });

            this.router.navigateTo('/');

            // To Navigate TO FTUE DEPENDING ON HELPER DATA :: HELPER DATA NOT AVAILABLE AT DEV

            // if(platformSdk){
            //     setTimeout(function(){
            //         if(platformSdk.helperData.ftueDone && platformSdk.helperData.ftueDone == 1){
            //             utils.toggleBackNavigation(true);
            //             self.router.navigateTo('/');
            //         }
            //         else{
            //             console.log("RUNNING FTUE");
            //             platformSdk.helperData = {'ftueDone': 1};
            //             platformSdk.updateHelperData(platformSdk.helperData);
               
            //             utils.toggleBackNavigation(true);          // Set To False :: Later
            //             self.router.navigateTo('/ftue_step_1'); // FTUE STEP
            //         }
            //     }, 0);
            // }
            
        }
    };

    module.exports = Application;

})(window);