(function (W, platformSdk) {
    'use strict';

    var utils = require('./utils.js');
    var checkTimeout = null;

    var SantaService = function (service) {
        this.SantaService = service;
    };

    var URL = {
        location: appConfig.API_URL,
    };

    SantaService.prototype = {
        
        // Subscribe URL

        subscribeToSecretSanta: function(fn, x){
            var params = {
                'url': URL.location+'/subscribe', 
                'type': 'POST', 
            };
            if (typeof fn === "function") return this.SantaService.communicate(params, fn, x);
            else this.SantaService.communicate(params);
        },

        // Get Reward Status and Rewards

        getRewards: function(fn, x){
            var params = {
                'url': URL.location +  '/rewards', 
                'type': 'GET', 
            };

            if (typeof fn === "function") return this.SantaService.communicate(params, fn, x);
            else this.SantaService.communicate(params);
        },

        // Assignment Status

        getAssignmentStatus: function(fn, x){
            var params = {
                'url': URL.location+'/assignment_status', 
                'type': 'GET', 
            };

            if (typeof fn === "function") return this.SantaService.communicate(params, fn, x);
            else this.SantaService.communicate(params);
        },

        // Confirm The Send Of The Gift

        sendGift: function(data, fn, x){
            var params = {
                'url': URL.location +  '/rewards', 
                'type': 'POST', 
                'data': data,
            };

            if (typeof fn === "function") return this.SantaService.communicate(params, fn, x);
            else this.SantaService.communicate(params);
        },

        // Reveal The Gift That Was Received By The User

        revealGift: function(fn, x){
            var params = {
                'url': URL.location +  '/show_rewards', 
                'type': 'GET', 
                'headers':[['platform_uid', platformSdk.appData.platformUid], 
                            ['platform_token', platformSdk.appData.platformToken]]
            };

            if (typeof fn === "function") return this.SantaService.communicate(params, fn, x);
            else this.SantaService.communicate(params);
        },

        // //Activate a New Wallet (OR FIRST TIME USER ONLY)
        // activateWallet: function(fn, x){
        //     var params = {
        //         'url': URL.location +  'activate', 
        //         'type': 'POST', 
        //         'headers':[['Content-Type', 'application/json'],
        //                     ['platform_uid', platformSdk.appData.platformUid], 
        //                     ['platform_token', platformSdk.appData.platformToken]]
        //     };

        //     if (typeof fn === "function") return this.PaymentService.communicate(params, fn, x);
        //     else this.PaymentService.communicate(params);
        // },

        // // Fetch balance for Waller
        // fetchBalance: function(fn, x){
        //     var params = {
        //         'url': URL.location + 'funds', 
        //         'type': 'GET', 
        //         'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.appData.platformUid], ['platform_token', platformSdk.appData.platformToken]]
        //     };
            
        //     if (typeof fn === "function") return this.PaymentService.communicate(params, fn, x);
        //     else this.PaymentService.communicate(params);
        // },

        // // Fetch Wallet Statement (Before :- ID if Blank - Gives Out Latest 10)
        // fetchTxHistory: function(fn, x, sId){
        //     // Statement ID :: Before For Calling Next Lost Of Transactions
        //     var params = {
        //         'url': URL.location + 'statement/list', 
        //         'type': 'GET', 
        //         'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.appData.platformUid], ['platform_token', platformSdk.appData.platformToken]]
        //     };
            
        //     if (sId){
        //         params.url = params.url+'?lastStatementId='+sId;
        //     }    
        //     if (typeof fn === "function") return this.PaymentService.communicate(params, fn, x);
        //     else this.PaymentService.communicate(params);
        // },

        // addBalance: function(data, fn, x){
        //     var params = {
        //         'url': URL.location + 'funds', 
        //         'type': 'POST', 
        //         'data': {
        //             "currency": data.currency,
        //             "amount": data.amt,
        //             "paymentOption": data.paymentMethod
        //         }, 
        //         'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.appData.platformUid], ['platform_token', platformSdk.appData.platformToken]]
        //     };
            
        //     if (typeof fn === "function") return this.PaymentService.communicate(params, fn);
        //     else this.PaymentService.communicate(params);
        // },

        // fundsTransfer: function(data, fn, x){

        //     var params = {
        //         'url': URL.location + 'funds/transfer', 
        //         'type': 'POST', 
        //         'data': {
        //             "currency": data.currency,
        //             "amount": data.amount,
        //             "userMessage": data.message,
        //             "receiverPlatformUid": data.uid
        //         }, 
        //         'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.appData.platformUid], ['platform_token', platformSdk.appData.platformToken]]
        //     };

        //     if (typeof fn === "function") return this.PaymentService.communicate(params, fn);
        //     else this.PaymentService.communicate(params);
        // }



    };

    module.exports = SantaService;

})(window, platformSdk);