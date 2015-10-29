(function (W, platformSdk) {
    'use strict';

    var utils = require('./utils.js');
    var PaymentService = function () {};
    PaymentService.prototype = {
        communicate: function (params, fn, x) {
            var that = this,
                requestUrl = appConfig.API_URL + '/wallet/' + params.url,
                startTime = Date.now(),
                endTime;

            var success = function(res){
                try { res = JSON.parse(decodeURIComponent(res)); } 
                catch(e) { return false; }

                fn.call(x, res);
            };

            var error = function(res){
                console.log(res);
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
                    data: params.data != undefined ? JSON.stringify(params.data) : null,
                    headers: params.headers,
                    success: success,
                    error: error
                });
            }
        },
        //ACtivate a New Wallet (NEW USER)
        activateWallet: function(fn, x){
            var params = {'url':'activate', 'type': 'POST', 'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.platformUid], ['platform_token', platformSdk.platformToken]]};
            if (typeof fn === "function") return this.communicate(params, fn, x);
            else this.communicate(params);
        },
        // Fetch balance for Waller
        fetchBalance: function(fn, x){
            var params = {'url':'funds', 'type': 'GET', 'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.platformUid], ['platform_token', platformSdk.platformToken]]};
            
            if (typeof fn === "function") return this.communicate(params, fn, x);
            else this.communicate(params);
        },

        // Fetch Wallet Statement (Before :- ID if Blank - Gives Out Latest 10)
        fetchTxHistory: function(fn, x, sId){
            // Statement ID :: Before For Calling Next Lost Of Transactions
            var params = {'url':'statement/list', 'type': 'GET', 'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.platformUid], ['platform_token', platformSdk.platformToken]]};
            
            if(sId){
                params.url = params.url+'?lastStatementId='+sId;
            }    
            if (typeof fn === "function") return this.communicate(params, fn, x);
            else this.communicate(params);
        },

        addBalance: function(data, fn, x){
            var params = {'url':'funds', 'type': 'POST', 'data': {
                "currency": data.currency,
                "amount": data.amt,
                "paymentOption": data.paymentMethod
            }, 'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.platformUid], ['platform_token', platformSdk.platformToken]]};
            
            if (typeof fn === "function") return this.communicate(params, fn);
            else this.communicate(params);
        },

        fundsTransfer: function(data, fn, x){

            var params = {'url':'funds/transfer', 'type': 'POST', 'data': {
                "currency": data.currency,
                "amount": data.amount,
                "userMessage": data.message,
                "receiverPlatformUid": data.uid
            }, 'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.platformUid], ['platform_token', platformSdk.platformToken]]};

            if (typeof fn === "function") return this.communicate(params, fn);
            else this.communicate(params);
        }

    };

    module.exports = PaymentService;

})(window, platformSdk);