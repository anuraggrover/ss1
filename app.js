(function (W) {
    'use strict';

    require('zepto.js');
    W.Mustache = require('mustache.js');

    var platformSdk = require('./libs/js/platformSdk');

    platformSdk.ready(function () {
        var environment = document.body.getAttribute('data-env'),
            config      = require('./config')(environment),
            Constants   = require('./constants'),
            Application = require('./js/application');

        platformSdk.bridge.setDebuggableEnabled(environment === Constants.STAGING_ENV);

        W.Config = config;

        var application = new Application({
            container: $("#container")
        });

        application.start();
    });

})(window);
