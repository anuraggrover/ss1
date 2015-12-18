(function (W, events, utils) {
    'use strict';

    var GiftEnabled_r = function (options) {
        this.template = require('raw!../../templates/giftenabled_r_ns.html');
    };

    GiftEnabled_r.prototype.destroy = function(){

    };

    GiftEnabled_r.prototype.bind = function(App, res){
        var that = this;

        var rGiftButton = this.el.getElementsByClassName('rGiftButton')[0];
        var ssOffer = this.el.getElementsByClassName('ssOffer');

        rGiftButton.addEventListener('click', function(ev){
            App.SantaService.revealGift(function(res){
                console.log(res);
                if(res.stat == "success"){
                    App.router.navigateTo('/giftdetails', res);    
                }
            }); 
        });

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
    };

    GiftEnabled_r.prototype.render = function(ctr, App, data) {

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
        this.bind(App, data);
    };

    module.exports = GiftEnabled_r;

})(window, platformSdk.events, platformSdk.utils);