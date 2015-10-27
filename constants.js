/**
 * Created by anuraggrover on 07/08/15.
 */

(function () {
    'use strict';

    module.exports = {
        DEV_ENV: 'dev',
        STAGING_ENV: 'staging',
        PROD_ENV:    'prod',

        ConnectionTypes: {
            NO_NETWORK: '-1',
            UNKNOWN: '0',
            WIFI: '1',
            TWO_G: '2',
            THREE_G: '3',
            FOUR_G: '4'
        },

        Events: {
            NAVIGATE_APP: 'app.navigate',
            TOGGLE_BLOCK: 'app.menu.om.block',
            CHANGE_LOCATION: 'app.menu.om.location',
            TOGGLE_IMAGES: 'app.menu.om.toggleImages',
            SHOW_COUPONS: 'app.showCouponStream',
            SHOW_COUPON: 'app.showCoupon',
            SHOW_FAQS: 'app.showFaqs',
            REDEEM_COUPON: 'app.redeemCoupon',
            UPDATE_APP_LOADER: 'app.loader.update',
            SHOW_ERR_MSG: 'app.errorMsg.show',
            REGION_CHANGED: 'app.regionChanged',
            REMOVE_TAB_LOADER: 'tab.loader.remove',
            REMOVE_TAB_STREAMER: 'tab.streamer.remove',
            TOGGLE_IMAGE_OPTIMIZATION: 'app.toggle.imageOptimization',
            TOGGLE_INTERNET_STATUS: 'app.toggle.internetStatus',
            TOGGLE_LOCATION_SELECTOR: 'app.showLocationSelector',
            RESET_APP: 'app.reset'
        }
    };

})();