(function (W, platformSdk, utils) {
    'use strict';

    var PaymentService = function () {};
    PaymentService.prototype = {
        communicate: function (params, fn, x) {
            var that = this,
                requestUrl = appConfig.API_URL + '/wallet/' + params.url,
                startTime = Date.now(),
                endTime;

            if (params.data) {
                requestUrl = params.url + '?' + utils.serializeParams(params.data);
            }

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
                    type: 'GET',
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

        txDetails: function(fn, x){
            // TOKEN AND UID PASSED OVER THE CALL
            console.log("Fetching the Transaction Details of The Transaction :: GET");
        },

        fundsTransfer: function(p2pdata){
            // TOKEN AND UID PASSED OVER THE CALL
            var params = {'url':'funds/transfer', 'type': 'GET', 'data': {"receiverPlatformUid": p2pdata.uid,"message": p2pdata.message,"currency": p2pdata.currency,"amount": p2pdata.amount}, 'headers':[['Content-Type', 'application/json'],['platform_uid', platformSdk.platformUid], ['platform_token', platformSdk.platformToken]]};
            
            if (typeof fn === "function") return this.communicate(params, fn);
            else this.communicate(params);
        }

    };

    module.exports = PaymentService;

})(window, platformSdk);