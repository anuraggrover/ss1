/**
 * Created by anuraggrover on 16/09/15.
 */

(function () {
    'use strict';

    var Constants = require('./constants');

    module.exports = function (env) {
        if (env === Constants.STAGING_ENV) {
            return {
                SUB_UNSUB_DOMAIN: 'http://54.254.187.66',
                // API_URL: 'http://coupons-api-staging.platform.hike.in'
                API_URL: 'http://192.168.1.4:9292'
            };
        } else if (env === Constants.PROD_ENV) {
            return {
                SUB_UNSUB_DOMAIN: 'https://subscription.platform.hike.in',
                API_URL: 'https://coupons-api.platform.hike.in'
            };
        }

        return {};
    };
})();