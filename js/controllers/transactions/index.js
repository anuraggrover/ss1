(function (W, platformSdk, events) {
    'use strict';

    var PaymentServices = require('../../util/paymentServices');
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        

    var IndexController = function (options) {
        this.template = require('raw!../../../templates/transactions/index.html');
    };

    IndexController.prototype.bind = function(){
        var El = $(this.el);

        $('.txListContainer').on('scroll', function() {
                
                if($(this).scrollTop() + $(this).height() >= this.scrollHeight) {

                    var barLoader = document.getElementById('load-bar');        
                
                    //Switch ON Bar Loader
                    barLoader.toggleClass('loadingBar', false);
        
                    //Get Last Statement ID
                    var lastStatementId = $('.txHistoryList').last().attr('data-sid');
                    //Re Call Payment Api With SID
                    var paymentService = new PaymentServices();
                    paymentService.fetchTxHistory(function(res){
                        for(var i =0; i<res.payload.length;i++){
                            var new_t ={
                                'sId':res.payload[i].statementId,
                                'tStatus':res.payload[i].transactionStatus,
                                'tType':res.payload[i].transactionType,
                                'tMonth':monthNames[res.payload[i].transactionDate.split('-')[0]].substr(0,3),
                                'tDay':res.payload[i].transactionDate.split('-')[1],
                                'currency':res.payload[i].currency,
                                'amount':res.payload[i].amount,
                                'tMessage':res.payload[i].transactionMessage
                            };
                            var t_row = '<div data-sid="'+new_t.sId+'" class="txHistoryList clearfix"><div class="txHistoryList-item-details"><div class="itemIcon iblock"><p class="timestamp_date">'+new_t.tDay+'</p><p class="timestamp_month">'+new_t.tMonth+'</p></div><div class="itemText iblock"><p class="itemHeading">'+new_t.tMessage+'</p><p class="itemSubheading">Trans. ID - '+new_t.sId+'</p></div></div><div class="txHistoryList-item-amount"><p class="'+new_t.tType+'">₹ '+new_t.amount+'</p></div></div>';
                            $("#tx").append(t_row);
                        }
                        // Switch Off Bar Loader
                        barLoader.toggleClass('loadingBar', true);
                    
                    }, this,lastStatementId);
                }
        });

        El.on('click', '.sendMoney', function(){
            if (PlatformBridge) {
                // Toggle Back and Up Press 
                utils.toggleBackNavigation(true);
                // Start The Contact Chooser Screen
                PlatformBridge.startContactChooser();
            }
        });
    };

    IndexController.prototype.render = function(ctr, data) {

        var that = this;
        var paymentService = new PaymentServices();
        paymentService.fetchTxHistory(function(res){
            // Transactions List

            this.transactions =[];
            // Date MM-DD-YYYY
            if(res.payload.length > 0){
                for(var i =0; i<res.payload.length;i++){
                    var t ={
                        'sId':res.payload[i].statementId,
                        'tStatus':res.payload[i].transactionStatus,
                        'tType':res.payload[i].transactionType,
                        'tMonth':monthNames[res.payload[i].transactionDate.split('-')[0]].substr(0,3),
                        'tDay':res.payload[i].transactionDate.split('-')[1],
                        'currency':res.payload[i].currency,
                        'amount':res.payload[i].amount,
                        'tMessage':res.payload[i].transactionMessage
                    };
                    this.transactions.push(t);
                }
            }
            else{
                console.log("Display Empty Illustration Here");
            }
            console.log(this.transactions);
            
            that.el = document.createElement('div');
            that.el.className = "txHistoryContainer";
            
            that.el.innerHTML = Mustache.render(that.template, {
                transactions: that.transactions,
                balance:data
            });
                
            events.publish('update.loader', {show:false});

            ctr.appendChild(that.el);
            that.bind();
        }, this);

        var self = this;

        return this;
    };

    module.exports = IndexController;
})(window, platformSdk, platformSdk.events);