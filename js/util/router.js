(function () {
    'use strict';

    var Router = function (options) {
        this.routes       = {};
        this.history 	  = [];
        this.currentRoute = null;
    };

    Router.prototype.route = function(route, callback) {
        this.routes[route] = callback;
    };

    Router.prototype.navigateTo = function(route, data) {
        if (this.currentRoute){
    		this.history.push(this.currentRoute);
    	}
        this.currentRoute = this.routes[route];
        this.currentRoute(data);
    };

    Router.prototype.back = function(){
    	if (this.history.length == 0) return;
    	this.currentRoute = this.history.pop();
    	this.currentRoute();
    };

    module.exports = Router;
})();