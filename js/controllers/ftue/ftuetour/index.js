(function () {
    'use strict';

    var FtueTourController = function (options) {
        this.template = require('raw!../../../../templates/ftue/ftuetour/index.html');
    };

    FtueTourController.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
        }));

        setTimeout(function(){
            var elem = $('#slider')[0];
            
            window.mySwipe = new Swipe(elem, {
                startSlide: 0,
                disableScroll: false,
                continuous: false,
                stopPropagation: false,
                callback: function(index, elem) {},
                transitionEnd: function(index, elem) {}
            });
        }, 0);

        return this;
    };
    module.exports = FtueTourController;
})();