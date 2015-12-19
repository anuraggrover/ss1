(function (W, events, utils) {
    'use strict';

    var SantaControlPanel = function (options) {
        this.template = require('raw!../../templates/santacontrolpanel.html');
    };

    SantaControlPanel.prototype.destroy = function(){

    };

    SantaControlPanel.prototype.bind = function(App, res){
        
        var that = this;

        var giftShelter  = this.el.getElementsByClassName('giftShelter')[0];
        var santaButton  = this.el.getElementsByClassName('santaButton')[0];
        var santeeButton = this.el.getElementsByClassName('santeeButton')[0];

        // Santa and Santee Status Inside the Res

        if(res){
            if(res.santa){
                santaButton.classList.add('assigned');
                platformSdk.appData.helperData.userSanta = true;
                platformSdk.updateHelperData(platformSdk.appData.helperData);
            }
            if(res.santi){
                santeeButton.classList.add('assigned');
                platformSdk.appData.helperData.userSanti = true;
                platformSdk.updateHelperData(platformSdk.appData.helperData);
            }
        }
        else{
            if(platformSdk.appData.helperData.userSanta){
                santaButton.classList.add('assigned');
            }
            if(platformSdk.appData.helperData.userSanti){
                santeeButton.classList.add('assigned');   
            }
        }

        // Gift Shelter Button

        giftShelter.addEventListener('click', function(ev){
            events.publish('update.loader', {show:true});
            if(platformSdk.bridgeEnabled){
                    App.SantaService.getRewards(function(res){
                    console.log(res);
                    if(res.stat == 'success'){
                        if(res.state == 'enabled'){
                            console.log("Enabled State :: Get Coupons");
                            // _NR_NS
                            if(!res.gift_received && !res.gift_sent){
                                App.router.navigateTo('/giftenabled_nr_ns', res);          
                            }
                            // NR_S
                            else if(!res.gift_received && res.gift_sent){
                                App.router.navigateTo('/giftenabled_nr_s', res);
                            }
                            // R_NS
                            else if(res.gift_received && !res.gift_sent){
                                App.router.navigateTo('/giftenabled_r_ns', res);
                            }
                            // _R_S
                            else if(res.gift_received && res.gift_sent){
                                App.router.navigateTo('/giftenabled_r_s', res);
                            }
                            // If some Exception Occurs
                            else{
                                events.publish('update.loader', {show:true});
                                platformSdk.ui.showToast("Some Error Occured. Please Try Again Later");
                            }
                        }
                        // Disabled State To Get The Counter Timestamp
                        else if(res.state == 'disabled'){
                            console.log("Disabled State :: Get Timestamp");
                            App.router.navigateTo('/giftcounter', res);
                        }
                    }
                    else{
                        if (platformSdk.bridgeEnabled) {
                            events.publish('update.loader', {show:false});
                            platformSdk.ui.showToast("Some Error Occured");
                        }
                        else {
                            console.log("Some Error Occured");
                        }
                    }            
                });
            }
            else{
                var res = {
                            "coupons": [{
                                "offer_id": 174,
                                "offer_sent": false,
                                "offerheading": "Lenskart",
                                "offericon": {
                                    "large": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/31/large/Lenskart_PNG.png?1441973594",
                                    "medium": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/31/medium/Lenskart_PNG.jpg?1441973594",
                                    "small": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/31/small/Lenskart_PNG.png?1441973594"
                                },
                                "offerterms": "Apply the code in E-gift voucher section\r\nValid on min purchase of Rs 1000\r\nApplicable over and above existing discounts\r\nOffer not valid on Rayban, Fastrack, Vogue, Oakley and Contact Lenses\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claim arising out of use of this coupon",
                                "offertext": "Rs 500 Gift Voucher"
                            }, {
                                "offer_id": 47,
                                "offer_sent": false,
                                "offerheading": "Dominos",
                                "offericon": {
                                    "large": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/30/large/Dominos_final.png?1441973593",
                                    "medium": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/30/medium/Dominos_final.jpg?1441973593",
                                    "small": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/30/small/Dominos_final.png?1441973593"
                                },
                                "offerterms": "Min bill of Rs 350\r\nApplicable only on online orders\r\nNot applicable on Simply Veg/Simply N.Veg pizza, Regular pizza, Pizza Mania combos, Sides, Beverages, Desserts & stuffed garlic bread\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                                "offertext": "20% off"
                            }, {
                                "offer_id": 228,
                                "offer_sent": false,
                                "offerheading": "ZoomIn",
                                "offericon": {
                                    "large": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/82/large/ZoomIn_Logo_2013-01.png?1443520858",
                                    "medium": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/82/medium/ZoomIn_Logo_2013-01.jpg?1443520858",
                                    "small": "http://hoppr-test-image.s3.amazonaws.com/coupons-staging/merchants/82/small/ZoomIn_Logo_2013-01.png?1443520858"
                                },
                                "offerterms": "Offer not valid on Canvas, Photobook, 12X18 Posters and Print Packs\r\nApplicable on website and app orders\r\nShipping charges as applicable\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                                "offertext": "45% off"
                            }],
                            "gift_received": false,
                            "gift_sent": false,
                            "stat": "success",
                            "state": "enabled"
                };
                App.router.navigateTo('/giftenabled_nr_ns', res);
            }
        });

        // Santa Button :: To Open The Santa Bot

        santaButton.addEventListener('click', function(ev){
            if (this.classList.contains('assigned')){
                if(platformSdk.bridgeEnabled){
                    // No Wrapper IN SDK For This Call
                    if(platformSdk.appData.helperData.santa_msisdn){
                        PlatformBridge.openActivity("{'screen' : 'chatthread', 'msisdn' : '"+platformSdk.appData.helperData.santa_msisdn+"', 'isBot' : false}");    
                    }else{
                        platformSdk.ui.showToast("Some Error Occured");
                    }    
                }
            } else { 
                if (platformSdk.bridgeEnabled) {
                    platformSdk.ui.showToast("We are working to find you a Santa. Please try again after some time.");
                }
                else {
                    console.log("We are working to find you a Santa. Please try again after some time.");
                }
            }
        });

        // Santi Button To Open The Santi BOT

        santeeButton.addEventListener('click', function(ev){
            if (this.classList.contains('assigned')){
                if(platformSdk.bridgeEnabled){
                    // No Wrapper IN SDK For This Call
                    if(platformSdk.appData.helperData.santi_msisdn){
                        PlatformBridge.openActivity("{'screen' : 'chatthread', 'msisdn' : '"+platformSdk.appData.helperData.santi_msisdn+"', 'isBot' : false}");    
                    }else{
                        platformSdk.ui.showToast("Some Error Occured");
                    }
                }
            } else { 
                if (platformSdk.bridgeEnabled) {
                    platformSdk.ui.showToast("We are working to make you someone's Santa. Please try again after some time.");
                }
                else {
                    console.log("We are working to make you someone's Santa. Please try again after some time.");
                }
            }
        });
    };

    SantaControlPanel.prototype.render = function(ctr, App, data) {

        this.el = document.createElement('div');
        this.el.className = "panelContainer animation_fadein noselect";
        this.el.innerHTML = Mustache.render(this.template, {});
        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App, data);
    };

    module.exports = SantaControlPanel;

})(window, platformSdk.events, platformSdk.utils);