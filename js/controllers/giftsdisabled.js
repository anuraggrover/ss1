(function (W, events, utils) {
    'use strict';

    var GiftCounter = function (options) {
        this.template = require('raw!../../templates/giftsdisabled.html');
    };

    GiftCounter.prototype.destroy = function(){

    };

    GiftCounter.prototype.bind = function(App, res){
        var that = this;
        
    };

    GiftCounter.prototype.render = function(ctr, App, data) {

        var days = Math.floor(data.timestamp / 86400);
        var hours = Math.floor((data.timestamp - (days * 86400)) / 3600);
        var minutes = Math.floor((data.timestamp - ((hours * 3600) + (days * 86400))) / 60);
        var seconds = data.timestamp - ((days * 86400) + (hours * 3600) + (minutes * 60));
        var result = new String();

        if((days > 0) === true){result += days + ' days,';}
        if((hours > 0) === true){result += ' ' + hours + ' hours, ';}
        if((minutes > 0) === true){result += ' ' + minutes + ' minutes,';}
        if((seconds > 0)){result += ' ' + seconds + ' seconds,';}

        result = result.slice(0, -1);
        console.log(result);

        this.el = document.createElement('div');
        this.el.className = "panelContainer animation_fadein";

        this.el.innerHTML = Mustache.render(this.template, { tdays:1,thours:2,tminutes:50, tseconds:30 });
        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App, data);
    };

    module.exports = GiftCounter;

})(window, platformSdk.events, platformSdk.utils);