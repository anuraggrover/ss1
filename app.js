(function (W) {
    'use strict';

    require('zepto.js');
    W.Mustache = require('mustache.js');
    
    var platformSdk = require('./libs/js/platformSdk');
    var utils = require('./js/util/utils');
    var swipe = require('script!./libs/js/swipe');

    platformSdk.ready(function () {
        var environment = document.body.getAttribute('data-env'),
            config      = require('./config')(environment),
            Constants   = require('./constants'),
            Application = require('./js/application');

        if (platformSdk.bridgeEnabled) platformSdk.bridge.setDebuggableEnabled(environment === Constants.STAGING_ENV);

        W.appConfig = config;

        var application = new Application({
            container: document.getElementById("container")
        });

        application.start();
    });

})(window);
