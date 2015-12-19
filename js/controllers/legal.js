(function (W, events, utils) {
    'use strict';

    var Legal = function (options) {
        this.template = require('raw!../../templates/legal.html');
    };

    Legal.prototype.destroy = function(){

    };

    Legal.prototype.bind = function(App, res){
        var that = this;

        var infoActionButton = this.el.getElementsByClassName('infoActionButton')[0];

        faqConfirm.addEventListener('click', function (ev) {
            events.publish('update.loader', {show: true});
            console.log(res);
            App.router.navigateTo('/', res);
        });
    };

    Legal.prototype.render = function(ctr, App, data) {

        this.el = document.createElement('div');
        this.el.className = "legalContainer animation_fadein";

        this.el.innerHTML = Mustache.render(this.template, {});
        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App, data);
    };

    module.exports = Legal;

})(window, platformSdk.events, platformSdk.utils);