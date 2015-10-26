(function (W) {
    'use strict';

    require('zepto.js');
    W.Mustache = require('mustache.js');
    
    var platformSdk = require('./libs/js/platformSdk');
    var swipe = require('script!./libs/js/swipe');
    
    platformSdk.ready(function () {
        var environment = document.body.getAttribute('data-env'),
            config      = require('./config')(environment),
            Constants   = require('./constants'),
            Application = require('./js/application');

        platformSdk.bridge.setDebuggableEnabled(environment === Constants.STAGING_ENV);

        W.appConfig = config;

        console.log("Paltform SDK is:-");
        console.log(platformSdk);

        var application = new Application({
            container: $("#container")
        });

        application.start();
    });

})(window);
