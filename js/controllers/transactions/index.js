(function () {
    'use strict';

    var IndexController = function (options) {
        this.template = require('raw!../../../templates/transactions/index.html');
        // Sample Transaction List 
        this.transactions = [
                                { type:'credit', tId:1234156, timestamp:'23/9/2015', tname:'Flipkart', amount:200  },
                                { type:'debit', tId:1344642, timestamp:'3/9/2014', tname:'Rahul D', amount:300 },
                                { type:'credit', tId:1245153, timestamp:'4/10/2016', tname:'Hemank Sabharwal', amount:150 }
                            ];
    };

    IndexController.prototype.render = function() {

        var that = this;

        that.el = $(Mustache.render(that.template, {
            transactions: that.transactions,
            balance:3000
        }));

        return this;
    };

    module.exports = IndexController;
})();