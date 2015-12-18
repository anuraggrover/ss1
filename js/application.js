(function (W, events) {
    'use strict';

    var WorkspaceController  = require('./controllers/workspace'),
        SantaControlPanel    = require('./controllers/santacontrolpanel'),
        
        GiftCounter          = require('./controllers/giftsdisabled'),
        
        GiftEnabled_NR_NS    = require('./controllers/giftenabled_nr_ns'),
        GiftEnabled_NR_S     = require('./controllers/giftenabled_nr_s'),
        GiftEnabled_R_NS     = require('./controllers/giftenabled_r_ns'),
        GiftEnabled_R_S      = require('./controllers/giftenabled_r_s'),
    
        GiftDetails          = require('./controllers/giftdetails'),

        Faq                  = require('./controllers/faq'),
        Legal                = require('./controllers/legal'),
        
        Router               = require('./util/router'),
        utils                = require('./util/utils'),
        
        TxService            = require('./util/txServices'),
        SantaServices        = require('./util/santaServices');

    // Full Screen Loader 
    var loader = document.getElementById('loader');
    var loadObject = events.subscribe('update.loader', function(params){
        loader.toggleClass('loading', params.show);
    });

    // Tap State Events :: Touch Start And Touch End

    document.addEventListener('touchstart', function(e) {
        e = e || window.event;
        var target = e.target;
        if(target.classList.contains('buttonTap')){
            target.classList.add('tapState');     
        }
        else if(target.classList.contains('buttonTapRed')){
            target.classList.add('tapStateRed');   
        }
        else if(target.classList.contains('buttonTapOffer')){
            target.classList.add('tapStateOffer');
        }
        else{
            return;
        }
    }, false);

    document.addEventListener('touchend', function(e) {
        e = e || window.event;
        var target = e.target;
        if(target.classList.contains('buttonTap')){
            target.classList.remove('tapState');     
        }   
        else if(target.classList.contains('buttonTapRed')){
            target.classList.remove('tapStateRed');   
        }
        else if(target.classList.contains('buttonTapOffer')){
            target.classList.remove('tapStateOffer');
        }
        else{
            return;
        }
    }, false);

    // No Internet Connection Tab 
    var noInternet = document.getElementById('nointernet');
    var noInternetObject = events.subscribe('app/offline', function(params){
        noInternet.toggleClass('no-internet-msg', params.show);
    });

    // Block Connection Tab 
    var isblock = document.getElementById('blockScreen');
    var isBlockObject = events.subscribe('app/block', function(params){
        isBlock.toggleClass('block-msg', params.show);
    });
    
    var Application = function (options) {
        this.container            = options.container;
        this.routeIntent          = options.route;
        
        this.router               = new Router();
        
        this.workspaceController  = new WorkspaceController();
        this.SantaControlPanel    = new SantaControlPanel();
        
        this.GiftCounter          = new GiftCounter();
        
        this.GiftEnabled_NR_NS    = new GiftEnabled_NR_NS();
        this.GiftEnabled_NR_S     = new GiftEnabled_NR_S();
        this.GiftEnabled_R_NS     = new GiftEnabled_R_NS();
        this.GiftEnabled_R_S      = new GiftEnabled_R_S();

        this.GiftDetails          = new GiftDetails();

        this.Faq                  = new Faq();
        this.Legal                = new Legal(); 
        
        this.TxService            = new TxService(); 
        this.SantaService         = new SantaServices(this.TxService);
    };
    
    Application.prototype = {

        // Setting Up The Three Dot Menu
        initOverflowMenu: function(){
        console.log("Defining the three dot");
        var omList = [{
            "title": platformSdk.block === "true" ? "Unblock" : "Block",
            "en": "true",
            "eventName": "app.menu.om.block"
        },
        {
            "title": "Notifications",
            "en": "true",
            "eventName": "app.menu.om.mute",
            "is_checked": platformSdk.mute === "true" ? "false" : "true"
        }];

        // Notifications  
        platformSdk.events.subscribe('app.menu.om.mute', function(id){
            id = "" + platformSdk.retrieveId('app.menu.om.mute');
            if (platformSdk.mute == "true"){
                platformSdk.mute = "false";
                platformSdk.muteChatThread();
                platformSdk.updateOverflowMenu(id, {
                    "is_checked": "true"
                });
            } else {
                platformSdk.mute = "true";
                platformSdk.muteChatThread();
                platformSdk.updateOverflowMenu(id, {
                    "is_checked": "false"
                });
            }
        });
        // Block
        platformSdk.events.subscribe('app.menu.om.block', function(id){
            id = "" + platformSdk.retrieveId('app.menu.om.block');
            if (platformSdk.block === "true"){
                platformSdk.block = "false";
                if (platformSdk.bridgeEnabled) platformSdk.unblockChatThread();
                platformSdk.events.publish('app.state.block.hide');
                platformSdk.updateOverflowMenu(id, {
                    "title": "Block"
                });

                events.publish('app/offline', {show:false});
                events.publish('app/block', {show:false});

            } else {
                platformSdk.block = "true";
                platformSdk.blockChatThread();
                platformSdk.events.publish('app.state.block.show');
                platformSdk.updateOverflowMenu(id, {
                    "title": "Unblock"
                });
                
                events.publish('app/block', {show:true});
                events.publish('app/offline', {show:false});
            }
        });
        platformSdk.setOverflowMenu(omList);
    },

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

            // Subscribe :: Workspace
            this.router.route('/optin', function(data){
                self.container.innerHTML = "";
                self.workspaceController.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            // Subscribe :: FAQ's
            this.router.route('/faq', function(data){
                self.container.innerHTML = "";
                self.Faq.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            // Subscribe :: Legal Screen
            this.router.route('/legal', function(data){
                self.container.innerHTML = "";
                self.Legal.render(self.container, self, data);
                utils.toggleBackNavigation();
            });

            // Santa Secret Panel Is Home
            this.router.route('/', function(data){
                self.container.innerHTML = "";
                self.SantaControlPanel.render(self.container, self, data);
                utils.toggleBackNavigation(false);
            });

            this.router.route('/giftcounter', function(data){
                self.container.innerHTML = "";
                self.GiftCounter.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            // Christmas Gift Panel Here (4 States To Be Handelled Here NR/NS :: NR/S :: R/NS :: R/S)
            // NR - Not Received
            // NS - Not Sent 
            // S - Sent
            // R - Received            
            // R/S :: giftenabled_r_s

            this.router.route('/giftenabled_r_s', function(data){
                self.container.innerHTML = "";
                self.GiftEnabled_R_S.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            // NR/NS :: gftenabled_nr_ns

            this.router.route('/giftenabled_nr_ns', function(data){
                self.container.innerHTML = "";
                self.GiftEnabled_NR_NS.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            // R/NS :: giftenabled_r_ns

            this.router.route('/giftenabled_r_ns', function(data){
                self.container.innerHTML = "";
                self.GiftEnabled_R_NS.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            //NR/S :: giftenabled_nr_s

            this.router.route('/giftenabled_nr_s', function(data){
                self.container.innerHTML = "";
                self.GiftEnabled_NR_S.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            // Gift Details Here Received Or Sent

            this.router.route('/giftdetails', function(data){
                self.container.innerHTML = "";
                self.GiftDetails.render(self.container, self, data);
                utils.toggleBackNavigation(true);
            });

            // First Time User
            if(platformSdk.block =="true"){
                console.log("User has blocked the Application");
                events.publish('app/block', {show:false});
            }      
            else if(!platformSdk.appData.helperData.SecretSantaActive){
                console.log("First Time User");
                self.router.navigateTo('/optin');
            } else {
                console.log("Regular User");
                if(platformSdk.bridgeEnabled){
                    // Get Assignment Status
                    events.publish('update.loader', {show:true});
                    this.SantaService.getAssignmentStatus(function(res){
                        console.log(res);
                        if(res.stat == "success"){
                            if(res.showLegal){
                                console.log("Show Legal Screen Here :: With The Terms Key");
                                self.router.navigateTo('/legal', res);
                            }
                            else{
                                console.log("Show Normal Panel Screen");
                                self.router.navigateTo('/', res);        
                            }
                        }
                    }, this);
                }
                else{
                    self.router.navigateTo('/', {santa:true, santi:true});
                }

            }   
        }
    };

    module.exports = Application;

})(window, platformSdk.events);