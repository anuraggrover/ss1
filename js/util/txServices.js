(function (W, platformSdk, events) {
    'use strict';

    var utils = require('./utils.js');
    var checkTimeout = null;

    var Constants = require('../../constants.js');
    
    var TxService = function () {};
    
    TxService.prototype = {
        communicate: function (params, fn, x) {
            var that = this,
                requestUrl = params.url,
                startTime = Date.now(),
                endTime;

            var checkConnection = function(fn, ctx){
                
                // For Devices, else case to run on Chrome's onLine method

                if (platformSdk.bridgeEnabled){
                    platformSdk.nativeReq({
                        fn: 'checkConnection',
                        ctx: this,
                        data: "",
                        success: function(response){
                            if (typeof fn === "function") fn.call(ctx,response);
                        }
                    }); 
                } else {
                    if (navigator.onLine){
                        if (typeof fn === "function") fn.call(ctx,navigator.onLine);
                    } else {
                        if (typeof fn === "function") fn.call(ctx,-1);
                    }
                }
            }; 

            var success = function(res){
                
                // If No Internet Connection Was There
                
                events.publish('app/offline', {show:false});
                
                try { res = JSON.parse(decodeURIComponent(res)); } 
                catch(e) { return false; }

                if (res) fn.call(x, res);
            };

            var error = function(res){

                // Check For Internet Connection
                
                checkConnection(function(type){
                    if (type !== 0 && type !== -1){
                        console.log("Internet Connection Working :: Some Other Error Occured");
                        events.publish('app/offline', {show:false});

                        fn.call(x, res);
                    } else {
                        console.log("No Internet Connection Found");
                        events.publish('app/offline', {show:true});
                        
                        // Set A Awake Call
                        //checkTimeout = setTimeout(checkConnection, 5000);
                    }
                }, this);
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
        }
    };

    module.exports = TxService;

})(window, platformSdk, platformSdk.events);