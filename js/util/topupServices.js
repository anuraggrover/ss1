(function (W, platformSdk) {
    'use strict';

    var utils = require('./utils.js');
    var Constants = require('../../constants.js');
    var checkTimeout = null;

    var URL = {
        location: appConfig.API_URL + '/hike-topup-service/'
    };

    var TopupService = function (service) {
        this.PaymentService = service;
    };

    TopupService.prototype = {
        
        // Get All the Available Topup Options From Server ::GET
        getPaymentOptions: function(fn, x){
            var params = {
                'topup': true, 
                'url': URL.location + 'topup/paymentOptions?currency=INR', 
                'type': 'GET', 
                'headers': [['Content-Type', 'application/json']]
            };
            
            if (typeof fn === "function") return this.PaymentService.communicate(params, fn, x);
            else this.PaymentService.communicate(params);
        },

        // Initiate A Payment To Get Payment Option URL
        initiatePayment: function(data, fn, x){
            var params = {
                'initateTopup':true, 
                'url': URL.location + 'payment/initiatePayment', 
                'type': 'POST', 
                'data': data, 
                'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.appData.platformUid], ['platform_token', platformSdk.appData.platformToken]]
            };
            
            if (typeof fn === "function") return this.PaymentService.communicate(params, fn, x);
            else this.PaymentService.communicate(params);
        }

    };

    module.exports = TopupService;

})(window, platformSdk);