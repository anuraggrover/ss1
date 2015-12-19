(function (W, events) {
    'use strict';

    var Router = function () {
        this.routes = {};
        this.history = [];
        this.prevData = this.currentRoute = null;

        this.getCache();
    };

    var _routerCache = {};

    var unload = function () {
        // ToDo: Redundant code
        events.publish('app.store.set', {
            key: '_routerCache',
            value: _routerCache
        });
    };

    // window.onbeforeunload = unload;

    Router.prototype.getCache = function () {
        events.publish('app.store.get', {
            key: '_routerCache',
            ctx: this,
            cb: function (r) {
                if (r.status === 1) {
                    this.history = r.results.history || [];
                }
            }
        });
    };

    Router.prototype.route = function (route, callback) {
        this.routes[route] = callback;
    };

    Router.prototype.navigateTo = function (route, data) {
        if (this.currentRoute) {
            this.history.push({
                route: this.currentRoute,
                data: this.prevData
            });
        }

        this.currentRoute = this.routes[route];
        this.prevData = data;
        this.currentRoute(data);

        if (route === "/") this.history = [];

        _routerCache['route'] = route;
        _routerCache['cache'] = data;
        _routerCache['history'] = this.history;

        unload();

    };

    Router.prototype.back = function () {
        var historyItem;

        if (this.history.length === 0) { return; }

        historyItem = this.history.pop();
        this.currentRoute = historyItem.route;
        this.currentRoute(historyItem.data);
    };

    module.exports = Router;
})(window, platformSdk.events);