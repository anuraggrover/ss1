
(function () {
    'use strict';

    var Constants = require('./constants');

    module.exports = function (env) {

        if (env === Constants.DEV_ENV) {
            return {
                SUB_UNSUB_DOMAIN: 'http://54.254.187.66',
                API_URL: 'http://projectx-staging.hike.in',
                SERVICE_URL: '/hike-wallet-service',
                SERVICE_TOPUP_URL: '/hike-topup-service'
            };
        } else if (env === Constants.STAGING_ENV) {
            return {
                SUB_UNSUB_DOMAIN: 'http://54.254.187.66',
                API_URL: 'http://projectx-staging.hike.in',
                SERVICE_URL: '/hike-wallet-service',
                SERVICE_TOPUP_URL: '/hike-topup-service'
            };
        } else if (env === Constants.PROD_ENV) {
            return {
                SUB_UNSUB_DOMAIN: 'https://subscription.platform.hike.in',
                API_URL: 'https://coupons-api.platform.hike.in',
                SERVICE_URL: '/hike-wallet-service',
                SERVICE_TOPUP_URL: '/hike-topup-service'
            };
        } 

        return {};
    };
})();