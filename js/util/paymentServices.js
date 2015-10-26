
(function (W) {
    'use strict';

    var platformSdk = require('../../libs/js/platformSdk'),
        utils = require('./utils'),
        BASE_ISSUE_URL = 'http://projectx-staging.hike.in/hike-wallet-service' + '/wallet/',
        PaymentService;

        console.log(BASE_ISSUE_URL);

    PaymentService = function () {
    };

    PaymentService.prototype = {
        
        // SERVICE GET CALL

        doGet: function (params) {
            var that = this,
                requestUrl = BASE_ISSUE_URL+params.url;
    
            console.log('calling service GET', requestUrl);

            $.ajax({
                type: 'GET',
                timeout: 30000,
                url: requestUrl,
                headers:params.headers,
                success: function(response) {
                    console.log(response);
                },
                error: function(response){
                    console.log("Some Error Occured");
                    console.log(response);    
                }
            }); 
        },

        // SERVICE POST CALL

        // doPost: function (params) {
        //     var that = this,
        //         requestUrl = params.url,
        //         startTime = Date.now(),
        //         endTime;

        //     if (params.data) {
        //         requestUrl = params.url + '?' + utils.serializeParams(params.data);
        //     }

        //     console.log('calling service GET', requestUrl, startTime);

        //     platformSdk.nativeReq({
        //         fn: 'doGetRequest',
        //         ctx: params.ctx || that,
        //         data: requestUrl,
        //         success: function (res) {
        //             var response;

        //             endTime = Date.now();

        //             console.log( 'service GET response time', requestUrl, endTime, endTime - startTime );
        //             console.log( 'service GET response', res );

        //             try {
        //                 res = JSON.parse(decodeURIComponent(res));
        //                 response = JSON.parse(res.response);
        //             } catch (e) {
        //                 console.log('failed to parse GET response', e);
        //             }

        //             if (isAjaxSuccessful(res)) {
        //                 console.log( 'Parsed service GET response', response );
        //                 utils.isFunction(params.success) && params.success(response);
        //             } else {
        //                 utils.isFunction(params.error) && params.error(res);
        //                 console.log('status code not 200');
        //             }
        //         }
        //     });
        // },

        activatWallet: function(){
            // TOKEN AND UID PASSED OVER THE CALL
            var params = {'url':'activate','headers':{'Content-Type': 'application/json','platform_uid': 'VhzmGOSwNYkM6JHE','platform_token': 'mACoHN4G0DI='}};
            return this.doGet(params);
        },

        fetchBalance: function(t,uid){
            // TOKEN AND UID PASSED OVER THE CALL
            var params = {'url':'funds','headers':{'Content-Type': 'application/json','platform_uid': 'VhzmGOSwNYkM6JHE','platform_token': 'mACoHN4G0DI='}};
            return this.doGet(params);
        },

        txHistory: function(){
            // TOKEN AND UID PASSED OVER THE CALL
            console.log("Fetching Tranfer Of Wallet History :: GET");
            var params = {'url':'transaction/list','headers':{'Content-Type': 'application/json','platform_uid': 'VhzmGOSwNYkM6JHE','platform_token': 'mACoHN4G0DI='}};
            return this.doGet(params);
        },

        txDetails: function(){
            // TOKEN AND UID PASSED OVER THE CALL
            console.log("Fetching the Transaction Details of The Transaction :: GET");
        },

        fundsTransfer: function(p2pdata){
            // TOKEN AND UID PASSED OVER THE CALL
            var params = {'url':'funds/transfer','data':{"receiverPlatformUid": p2pdata.uid,"message": p2pdata.message,"currency": p2pdata.currency,"amount": p2pdata.amount},'headers':{'Content-Type': 'application/json','platform_uid': 'VhzmGOSwNYkM6JHE','platform_token': 'mACoHN4G0DI='}};
            return this.doGet(params);
        }

    };

    module.exports = new PaymentService();

})(window);