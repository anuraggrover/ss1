(function (W, events, utils) {
    'use strict';

    var Faq = function (options) {
        this.template = require('raw!../../templates/faq.html');
    };

    Faq.prototype.destroy = function () {

    };

    Faq.prototype.bind = function (App, res) {
        var that = this;

        var faqConfirm = this.el.getElementsByClassName('faqConfirm')[0];

        faqConfirm.addEventListener('click', function (ev) {
            events.publish('update.loader', {show: true});

            if (platformSdk.bridgeEnabled) {
                App.SantaService.getAssignmentStatus(function (res) {
                    console.log(res);
                    if (res.stat == "success") {
                        if (res.showLegal) {
                            console.log("Show Legal Screen Here :: With The Terms Key");
                            App.router.navigateTo('/legal', res);
                        }
                        else {
                            console.log("Show Normal Panel Screen");
                            App.router.navigateTo('/', res);
                        }
                    }
                });
            }
            else {
                // Take To Santa Panel
                App.router.navigateTo('/', res);
            }
        });

    };

    Faq.prototype.render = function (ctr, App, data) {

        this.el = document.createElement('div');
        this.el.className = "faqContainer animation_fadein";

        this.HowToUseList = [
            {'itemCount':1,'item':'You will be matched randomly with some Santa from the hike user base.'},
            {'itemCount':2,'item':'It will be fully anonymous and your identity will not be revealed.'},
            {'itemCount':3,'item':'Start chatting with your Santa. Be nice and you’ll get a gift from them.'},
            {'itemCount':4,'item':'Find out more about your match by chatting with them.'},
            {'itemCount':5,'item':'On 24th Dec, your Gift basket will get activated.'}
        ];

        this.el.innerHTML = Mustache.render(this.template, {HowToUseList:this.HowToUseList});
        ctr.appendChild(this.el);
        events.publish('update.loader', {show: false});
        this.bind(App, data);
    };

    module.exports = Faq;

})(window, platformSdk.events, platformSdk.utils);