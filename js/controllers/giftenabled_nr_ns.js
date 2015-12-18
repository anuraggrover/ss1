(function (W, events, utils) {
    'use strict';

    var GiftEnabled_nr = function (options) {
        this.template = require('raw!../../templates/giftenabled_nr_ns.html');
    };

    GiftEnabled_nr.prototype.destroy = function(){

    };

    GiftEnabled_nr.prototype.bind = function(App, res){
        var that = this;

        var santaChatButton = this.el.getElementsByClassName('santaChatButton')[0];
        var ssOffer = this.el.getElementsByClassName('ssOffer');

        var coupon_select = function() {
            var oid = this.getAttribute("data-oid");
            var offer = null;
            
            for(var i=0;i<res.length;i++){
                if(oid == res[i].offer_id){
                    offer = res[i];
                }
            }

            App.router.navigateTo('/giftdetails', offer);
        };

        for(var i=0;i<ssOffer.length;i++){
            ssOffer[i].addEventListener('click', coupon_select, false);
        }

        // Talk to Santa Chat Button
        
        santaChatButton.addEventListener('click', function(ev){
            if (this.classList.contains('assigned')){
                if(platformSdk.bridgeEnabled){
                    PlatformBridge.openActivity("{'screen' : 'chatthread', 'msisdn' : '+hike3+', 'isBot' : false}");    
                }
            } else { 
                if (platformSdk.bridgeEnabled) PlatformBridge.showToast("We are working to find you a Santa. Please try again after some time");
                else console.log("We are working to find you a Santa. Please try again after some time");
            }
        });

    };

    GiftEnabled_nr.prototype.render = function(ctr, App, data) {
        
        this.el = document.createElement('div');
        this.el.className = "giftResultContainer animation_fadein";

        if(data && data.coupons){
            this.ssoffers = data.coupons;
        }

        for(var i=0;i<this.ssoffers.length; i++){
            this.ssoffers[i].offericon = this.ssoffers[i].offericon.medium;
            if(this.ssoffers[i].offer_sent){
                this.ssoffers.offerstatus = 'osent';
            }
        }

        this.el.innerHTML = Mustache.render(this.template, { secretsantaoffers:this.ssoffers });
        ctr.appendChild(this.el);
        //events.publish('update.loader', {show:false});
        this.bind(App, this.ssoffers);
    };

    module.exports = GiftEnabled_nr;

})(window, platformSdk.events, platformSdk.utils);