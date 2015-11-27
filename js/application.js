(function (W, events) {
    'use strict';
    
    var WorkspaceController  = require('./controllers/workspace'),
        TransIndexController = require('./controllers/transactions/index'),
        
        TxConfirm            = require('./controllers/txconfirm'),
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
        
        TxService            = require('./util/txServices'),
        PaymentServices      = require('./util/paymentServices'),
        TopupServices        = require('./util/topupServices'),

        Keyboard             = require('./util/keyboard');

    // Full Screen Loader 
    var loader = document.getElementById('loader');
    var loadObject = events.subscribe('update.loader', function(params){
        loader.toggleClass('loading', params.show);
    });

    // Vertical Bar Loader
    // var loaderVertical = document.getElementById('loader');
    // var loadObjectVertical = events.subscribe('update.loaderVertical', function(params){
    //     loader.toggleClass('loading', params.show);
    // });

    // // Transaction Div Loader 
    // var loaderTx = document.getElementById('loader');
    // var loadObjectTx = events.subscribe('update.loaderTx', function(params){
    //     loader.toggleClass('loading', params.show);
    // });

    // No Internet Connection Tab 
    var noInternet = document.getElementById('nointernet');
    var noInternetObject = events.subscribe('app/offline', function(params){
        noInternet.toggleClass('no-internet-msg', params.show);
    });
    
    var Application = function (options) {
        this.container            = options.container;
        this.routeIntent          = options.route;
        
        this.router               = new Router();
        
        this.workspaceController  = new WorkspaceController();
        this.transIndexController = new TransIndexController();
        
        this.topup1Controller     = new Topup1Controller();
        this.topup2Controller     = new Topup2Controller();
        this.sendMoneyController  = new SendMoneyController();
        this.txConfirmController  = new TxConfirm();
        
        this.ftuestep1Controller  = new Ftue1Controller();
        this.ftuestep2Controller  = new Ftue2Controller();
        this.ftuestep3Controller  = new Ftue3Controller();
        this.ftuestep4Controller  = new Ftue4Controller();
        this.ftuetourController   = new FtueTourController();
        
        this.TxService            = new TxService(); 
        this.PaymentService       = new PaymentServices(this.TxService);
        this.TopupService         = new TopupServices(this.TxService);
    };
    
    Application.prototype = {

        backPressTrigger: function() {
            this.router.back();            
        },

        getRoute: function(){
            var that = this;

            if (this.routeIntent !== undefined){
                
            } else {
                events.publish('app.store.get', {
                    key: '_routerCache',
                    ctx: this,
                    cb: function(r){
                        if (r.status === 1 && platformSdk.bridgeEnabled){
                            try {
                                that.router.navigateTo(r.results.route, r.results.cache);
                            } catch(e){
                                that.router.navigateTo('/');    
                            }
                        } else {
                            that.router.navigateTo('/');
                        }
                    }
                });    
            }
        },

        start: function () {

            var self = this;
            self.$el = $(this.container);
        
            utils.toggleBackNavigation(false);
            
            platformSdk.events.subscribe('onBackPressed', function(){
                self.backPressTrigger();
            });
            
            platformSdk.events.subscribe('onUpPressed', function(){
                self.backPressTrigger();
            });

            this.router.route('/', function(data){
                self.container.innerHTML = "";
                self.workspaceController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            this.router.route('/transactions', function(data){
                self.container.innerHTML = "";
                self.transIndexController.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            this.router.route('/addMoney', function(data){
                self.container.innerHTML = "";
                self.topup1Controller.render(self, data);
                utils.toggleBackNavigation(true);
            });

            this.router.route('/addMoney_paymentMethod', function(data){
                self.container.innerHTML = "";
                self.topup2Controller.render(self, data);
                utils.toggleBackNavigation(true);
            });

            this.router.route('/sendMoney', function(data){

                var available_hikeBalance = data;

                var onContactChooserResult = function(res) {

                    try {
                        res = JSON.parse(decodeURIComponent(res));
                    } catch(e){

                    }

                    if (res.result_code == 1){
                        try { 
                            res.contactInfo = JSON.parse(res.contactInfo);
                        } catch(e){}

                        var data = {
                            uid: res.contactInfo[0].platformUid,
                            currency: "INR",
                            message: "Funds Transfer",
                            contact: res.contactInfo[0],
                            walletAvailBalance: available_hikeBalance
                        };

                        self.container.innerHTML = "";
                        self.sendMoneyController.render(self.container, self, data);

                        utils.toggleBackNavigation(true);
                        
                    } else {
                        console.log("Success Response:: Routing To p2p ,Transfer");
                        console.log("Failed::Add Exception", res.result_code, res.contactInfo);
                    }
                };

                if (platformSdk.bridgeEnabled) {
                    platformSdk.nativeReq({
                        fn: 'startContactChooserForMsisdnFilter',
                        ctx: this,
                        data: JSON.stringify({"list": "", "title": "Select a Contact"}),
                        success: onContactChooserResult
                    });
                } else {
                    var x = encodeURIComponent(JSON.stringify({'result_code': 1, contactInfo: [{"platformUid":"VhzmGOSwNYkM6JHE","msisdn":"+919000000236","thumbnail":"dummy.jpg","name":"9000000236"}]}));
                    onContactChooserResult(x);
                }
            });

            this.router.route('/txConfirmation', function(data){
                self.container.innerHTML = "";
                self.txConfirmController.render(self.container, self, data);
                utils.toggleBackNavigation(true);
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

            // To Navigate TO FTUE DEPENDING ON HELPER DATA :: HELPER DATA NOT AVAILABLE AT DEV
            // Here The Activate Wallet Needs To Be Run As Well

            if (platformSdk.bridgeEnabled && !platformSdk.appData.helperData.walletActive){
                this.PaymentService.activateWallet(function(res){
                    self.getRoute();
                    platformSdk.appData.helperData.walletActive = true;
                    platformSdk.updateHelperData(platformSdk.appData.helperData);
                }, this);
            } else {
                self.getRoute();
            }   

            if(platformSdk && platformSdk.isDevice){
                setTimeout(function(){
                    // Existing User
                    // if(platformSdk.helperData.ftueDone && platformSdk.helperData.ftueDone == 1){
                    //     utils.toggleBackNavigation(true);
                    //     self.router.navigateTo('/');
                    // }
                    // New User :: Activate Wallet For The New User
                    // else{
                    //     this.PaymentService.activateWallet(function(res){
                    //         utils.toggleBackNavigation(true);           // Set To False :: Later
                    //         self.router.navigateTo('/ftue_step_1');     // FTUE STEP
                    //     }, this);
                    //     // Updates The Helper Data
                    //     platformSdk.helperData = {'ftueDone': 1};
                    //     platformSdk.updateHelperData(platformSdk.helperData);
                    // }
                }, 0);
            }
        }
    };

    module.exports = Application;

})(window, platformSdk.events);