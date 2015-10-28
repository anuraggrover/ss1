(function () {
    'use strict';

    var Keyboard = function (options) {
        this.newValue = options.newvalue;
        this.oldValue = options.oldvalue;
        this.event = options.event;
    };

    Keyboard.prototype.backspace = function(key, callback) {
        
    };

    Keyboard.prototype.proceed = function(key, callback) {
        
    };

    Keyboard.prototype.appendDigit = function(callback){
        var val = this.oldValue + this.newValue;
        return callback(val);

    };

    module.exports = Keyboard;
})();