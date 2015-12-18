(function (W, events, utils) {
    'use strict';

    var Faq = function (options) {
        this.template = require('raw!../../templates/faq.html');
    };

    Faq.prototype.destroy = function(){

    };

    Faq.prototype.bind = function(App, res){
        var that = this;

        var faqConfirm = this.el.getElementsByClassName('faqConfirm')[0];

        faqConfirm.addEventListener('click', function(ev){
            events.publish('update.loader', {show:true});    
            if(platformSdk.bridgeEnabled){
                App.SantaService.getAssignmentStatus(function(res){
                    console.log(res);
                    if(res.stat == "success"){
                        if(res.showLegal){
                            console.log("Show Legal Screen Here :: With The Terms Key");
                            self.router.navigateTo('/legal', res);
                        }
                        else{
                            console.log("Show Normal Panel Screen");
                            self.router.navigateTo('/', res);        
                        }
                    }
                });
            }
            else{
                // Take To Santa Panel
                App.router.navigateTo('/', res);
            }
        });
        
    };

    Faq.prototype.render = function(ctr, App, data) {

        this.el = document.createElement('div');
        this.el.className = "faqContainer animation_fadein";

        this.el.innerHTML = Mustache.render(this.template, {});
        ctr.appendChild(this.el);
        events.publish('update.loader', {show:false});
        this.bind(App, data);
    };

    module.exports = Faq;

})(window, platformSdk.events, platformSdk.utils);