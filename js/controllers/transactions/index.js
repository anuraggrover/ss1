(function (W, platformSdk, events) {
    'use strict';

    var utils = require('../../util/utils');
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        
    var IndexController = function (options) {
        this.template = require('raw!../../../templates/transactions/index.html');
    };

    IndexController.prototype.bind = function(){
        
        var that = this;
        var barLoader = document.getElementById('load-bar');
        var txListContainer = document.getElementsByClassName('txListContainer')[0];
        var tx = document.getElementById('tx');

        txListContainer.addEventListener('scroll', utils.debounce(function(ev){
            if (this.scrollTop + this.offsetHeight + 60 >= this.scrollHeight) {
                
                var lastStatementId = this.getElementsByClassName('txHistoryList');
                lastStatementId = lastStatementId[lastStatementId.length - 1].getAttribute('data-sid');

                barLoader.toggleClass('loadingBar', false);

                that.App.PaymentService.fetchTxHistory(function(res){
                    for (var i =0; i < res.payload.length; i++){
                        var new_t ={
                            'sId': res.payload[i].statementId,
                            'tStatus': res.payload[i].transactionStatus,
                            'tType': res.payload[i].transactionType,
                            'tMonth': monthNames[res.payload[i].transactionDate.split('-')[0]].substr(0,3),
                            'tDay': res.payload[i].transactionDate.split('-')[1],
                            'currency': res.payload[i].currency,
                            'amount': res.payload[i].amount,
                            'tMessage': res.payload[i].transactionMessage
                        };
                        
                        var div = document.createElement('div');
                        div.innerHTML = '<div data-sid="' + new_t.sId + '" class="txHistoryList clearfix"><div class="txHistoryList-item-details"><div class="itemIcon iblock"><p class="timestamp_date">'+new_t.tDay+'</p><p class="timestamp_month">'+new_t.tMonth+'</p></div><div class="itemText iblock"><p class="itemHeading">'+new_t.tMessage+'</p><p class="itemSubheading">Trans. ID - '+new_t.sId+'</p></div></div><div class="txHistoryList-item-amount"><p class="'+new_t.tType+'">₹ '+new_t.amount+'</p></div></div>';
                        
                        tx.appendChild(div.children[0]);
                    }
                    
                    // Switch Off Bar Loader
                    barLoader.toggleClass('loadingBar', true);
                
                }, this,lastStatementId);
            }
        }, 120));

        this.el.addEventListener('click', function(ev){
            if (platformSdk.bridgeEnabled) {
                utils.toggleBackNavigation(true);
                PlatformBridge.startContactChooser();
            }
        });
    };

    IndexController.prototype.render = function(ctr, App, data) {

        var that = this;
        this.App = App;

        App.PaymentService.fetchTxHistory(function(res){
            
            // Transactions List
            this.transactions =[];
            
            // Date MM-DD-YYYY
            if (res.payload.length > 0){
                for (var i = 0; i < res.payload.length; i++){
                    var t = {
                        'sId': res.payload[i].statementId,
                        'tStatus': res.payload[i].transactionStatus,
                        'tType': res.payload[i].transactionType,
                        'tMonth': monthNames[res.payload[i].transactionDate.split('-')[0]].substr(0,3),
                        'tDay': res.payload[i].transactionDate.split('-')[1],
                        'currency': res.payload[i].currency,
                        'amount': res.payload[i].amount,
                        'tMessage': res.payload[i].transactionMessage
                    };

                    this.transactions.push(t);
                }
            } else {
                console.log("Display Empty Illustration Here");
            }

            console.log(this.transactions);
            
            that.el = document.createElement('div');
            that.el.className = "txHistoryContainer animation_fadein";
            
            that.el.innerHTML = Mustache.render(that.template, {
                transactions: that.transactions,
                balance: data
            });
                
            events.publish('update.loader', {show:false});

            ctr.appendChild(that.el);
            that.bind();

        }, this);

        return this;
    };

    module.exports = IndexController;
})(window, platformSdk, platformSdk.events);