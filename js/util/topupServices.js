(function (W, platformSdk) {
    'use strict';

    var utils = require('./utils.js');
    var TopupService = function () {};
    TopupService.prototype = {
        communicate: function (params, fn, x) {
            var that = this,
                requestUrl = 'http://projectx-staging.hike.in/hike-topup-service' + '/topup/' + params.url,
                startTime = Date.now(),
                endTime;

            var success = function(res){
                try { res = JSON.parse(decodeURIComponent(res)); } 
                catch(e) { return false; }

                fn.call(x, res);
            };

            var error = function(res){
                // Error Callback
                console.log("Error Occured");
                //fn.call(x,res);
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
            var params = {'url':'paymentOptions?currency=INR', 'type': 'GET', 'headers':[['Content-Type', 'application/json']]};
            
            if (typeof fn === "function") return this.communicate(params, fn, x);
            else this.communicate(params);
        },

        // Initiate A Payment To Get Payment Option URL
        initiatePayment: function(data, fn, x){
            var params = {'url':'payment/initiatePayment', 'type': 'POST', 'data': data, 'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.appData.platformUid], ['platform_token', platformSdk.appData.platformToken]]};
            
            if (typeof fn === "function") return this.communicate(params, fn);
            else this.communicate(params);
        }

    };

    module.exports = TopupService;

})(window, platformSdk);