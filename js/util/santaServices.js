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
                'type': 'POST'
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
            };

            if (typeof fn === "function") return this.SantaService.communicate(params, fn, x);
            else this.SantaService.communicate(params);
        },
    };

    module.exports = SantaService;

})(window, platformSdk);