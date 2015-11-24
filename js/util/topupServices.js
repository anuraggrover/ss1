(function (W, platformSdk) {
    'use strict';

    var utils = require('./utils.js');
    var Constants = require('../../constants.js');
    var checkTimeout = null;

    var TopupService = function () {};
    TopupService.prototype = {
        communicate: function (params, fn, x) {
            var that = this,
                requestUrl = 'http://172.16.3.20:8080/hike-topup-service/' + params.url,
                startTime = Date.now(),
                endTime;

            //Check Internet If Error Occurs in API
            var checkConnection = function(fn, ctx){
                // For Devices
                if (platformSdk.bridgeEnabled){
                    platformSdk.nativeReq({
                        fn: 'checkConnection',
                        ctx: this,
                        data: "",
                        success: function(response){
                            if (typeof fn === "function") fn.call(ctx,response);
                        }
                    }); 
                } 
                // For Chrome
                else {
                    if (navigator.onLine){
                        if (typeof fn === "function") fn.call(ctx,navigator.onLine);
                    } else {
                        if (typeof fn === "function") fn.call(ctx,-1);
                    }
                }
            };

            var success = function(res){
                try { res = JSON.parse(decodeURIComponent(res)); } 
                catch(e) { return false; }

                fn.call(x, res);
            };

            var error = function(res){
                // Error Callback
                checkConnection(function(result){
                    if(result == Constants.ConnectionTypes.NO_NETWORK){
                        console.log("No Internet Connection Found");
                        events.publish('app/offline', {show:true});
                    }
                    else{
                        console.log("Internet Connection Working :: Some Other Error Occured");        
                        //fn.call(x,res);
                    }
                }, x);    
            };

            if (platformSdk.isDevice){
                var data = JSON.stringify({
                    url: requestUrl,
                    params: params.data
                });

                platformSdk.nativeReq({
                    fn: type === "GET" ? 'doGetRequest' : 'doPostRequest',
                    ctx: params.ctx || that,
                    data: params,
                    success: success,
                    error: error
                });

            } else {
                platformSdk.ajax({
                    type: params.type,
                    url: requestUrl,
                    timeout: 30000,
                    data: params.data !== undefined ? JSON.stringify(params.data) : null,
                    headers: params.headers,
                    success: success,
                    error: error
                });
            }
        },
        
        // Get All the Available Topup Options From Server ::GET
        getPaymentOptions: function(fn, x){
            var params = {
                'topup': true, 
                'url':'topup/paymentOptions?currency=INR', 
                'type': 'GET', 
                'headers': [['Content-Type', 'application/json']]
            };
            
            if (typeof fn === "function") return this.communicate(params, fn, x);
            else this.communicate(params);
        },

        // Initiate A Payment To Get Payment Option URL
        initiatePayment: function(data, fn, x){
            var params = {
                'initateTopup':true, 
                'url':'payment/initiatePayment', 
                'type': 'POST', 
                'data': data, 
                'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.appData.platformUid], ['platform_token', platformSdk.appData.platformToken]]
            };
            
            if (typeof fn === "function") return this.communicate(params, fn);
            else this.communicate(params);
        }

    };

    module.exports = TopupService;

})(window, platformSdk);