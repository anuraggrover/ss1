(function (W, events, utils) {
    'use strict';

    var GiftDetails = function (options) {
        this.template = require('raw!../../templates/giftdetails.html');
    };

    GiftDetails.prototype.destroy = function(){

    };

    GiftDetails.prototype.bind = function(App, res){
        var that = this;
        
        var giftConfirmSend = this.el.getElementsByClassName('giftConfirmSend')[0];
        var giftCodeValue = this.el.getElementsByClassName('giftCodeValue')[0];
        var offerIcon = this.el.getElementsByClassName('offerIcon')[0];

        if(offerIcon){
            offerIcon.style.background = "url('"+res.offericon.medium+"')";
            offerIcon.style.backgroundSize = "contain";
            offerIcon.style.backgroundRepeat = "no-repeat";
        }    
        else{
            offerIcon.style.background = "url('images/giftclosed.png')";
            offerIcon.style.backgroundSize = "contain";
            offerIcon.style.backgroundRepeat = "no-repeat";
        } 
        
        // Remove The Gift Code For Confirm and Send
        if(res && res.giftStatus == 'sGift'){
            giftCodeValue.remove();
        }

        giftConfirmSend.addEventListener('click', function(ev){
            
            // See More Coupons
            if(this.classList.contains('rGift')){
                if (platformSdk.bridgeEnabled){
                    platformSdk.nativeReq({
                        fn: 'openNonMessagingBot',
                        ctx: this,
                        data: "+hikecoupons+",
                        success: function(response){
                            if(response == 'Failure'){
                                platformSdk.ui.showToast("Some Error Occured.");
                            }
                        }
                    }); 
                } else {
                    console.log("Taking to Coupons");
                }
            }
            // Confirm and Send
            else if(this.classList.contains('sGift')){
                events.publish('update.loader', {show:true});
                var data = {'coupon_id': res.offer_id };
                if(platformSdk.bridgeEnabled){
                    App.SantaService.sendGift(data, function(res){
                        console.log(res);
                        if(res.stat == 'success'){
                            platformSdk.ui.showToast("Gift successfully sent"); 
                            App.router.navigateTo('/');
                        }
                        else if(res.stat == "fail"){
                            events.publish('update.loader', {show:false});
                            platformSdk.ui.showToast("Some other Error Occured"); 
                        }   
                        // Handle state deleted 
                    });    
                }
                else{
                    App.router.navigateTo('/santacontrolpanel',{santa:true, santi:false});
                }
            }
            else{
                if (platformSdk.bridgeEnabled) {
                    platformSdk.ui.showToast("Some other Error Occured");
                }
                else console.log("Some other Error Occured");
                return;
            }
            //App.router.navigateTo('/giftenabled', res);
        });

    };

    GiftDetails.prototype.render = function(ctr, App, data) {

        this.giftDetailsPage = {};

        this.el = document.createElement('div');
        this.el.className = "giftDetailsContainer animation_fadein";

        if(data && data.received_coupon){
            this.giftDetailsPage = data.received_coupon;
            this.giftDetailsPage.buttonHeading = 'See More Coupons';
            this.giftDetailsPage.hikeCouponCode = data.received_coupon['code'];
            this.giftDetailsPage.giftStatus ='rGift';
        }
        else{
            this.giftDetailsPage = data;
            this.giftDetailsPage.buttonHeading = 'Confirm and Send';
            this.giftDetailsPage.giftStatus ='sGift';
        }

        this.giftDetailsPage.offerterms = this.giftDetailsPage.offerterms.split('\n');

        this.el.innerHTML = Mustache.render(this.template, {giftDetailsPage:this.giftDetailsPage});
        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App, this.giftDetailsPage);
    };

    module.exports = GiftDetails;

})(window, platformSdk.events, platformSdk.utils);