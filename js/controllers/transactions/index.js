(function () {
    'use strict';

    var IndexController = function (options) {
        this.template = require('raw!../../../templates/transactions/index.html');
        // Sample Transaction List 
        this.transactions = [
                                { type:'credit', tid:1, timestamp:'23/9/2015', tname:'Flipkart', amount:200  },
                                { type:'debit', tid:2, timestamp:'3/9/2014', tname:'Rahul D', amount:300 },
                                { type:'credit', tid:3, timestamp:'4/10/2016', tname:'Hemank Sabharwal', amount:150 }
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