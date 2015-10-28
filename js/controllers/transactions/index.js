(function (W, platformSdk) {
    'use strict';

    var PaymentServices = require('../../util/paymentServices');

    var IndexController = function (options) {
        this.template = require('raw!../../../templates/transactions/index.html');
    };

    IndexController.prototype.bind = function(){
        var El = $(this.el);

        $('.txListContainer').on('scroll', function() {
                if($(this).scrollTop() + $(this).height() >= this.scrollHeight) {
                    
                    //Get Last Statement ID
                    var lastStatementId = $('.txHistoryList').last().attr('data-sid');
                    //Re Call Payment Api With SID
                    var paymentService = new PaymentServices();
                    paymentService.fetchTxHistory(function(res){
                        
                        for(var i =0; i<res.payload.length;i++){
                            var new_t ={
                                'sId':res.payload[i].statementId,
                                'tId':res.payload[i].transactionId,
                                'tStatus':res.payload[i].transactionStatus,
                                'tType':res.payload[i].transactionType,
                                'tMonth':'Sep',
                                'tDay':20,
                                'currency':res.payload[i].currency,
                                'amount':res.payload[i].amount,
                                'tMessage':res.payload[i].transactionMessage
                            };
                            var t_row = '<div data-sid="'+new_t.sId+'" class="txHistoryList clearfix"><div class="txHistoryList-item-details"><div class="itemIcon iblock"><p class="timestamp_date">'+new_t.tDay+'</p><p class="timestamp_month">'+new_t.tMonth+'</p></div><div class="itemText iblock"><p class="itemHeading">'+new_t.tMessage+'</p><p class="itemSubheading">Trans. ID - '+new_t.tId+'</p></div></div><div class="txHistoryList-item-amount"><p class="'+new_t.tType+'">'+new_t.amount+'</p></div></div>';
                            $("#tx").append(t_row);
                        }
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

    IndexController.prototype.render = function(ctr) {

        var that = this;
        var paymentService = new PaymentServices();
        paymentService.fetchTxHistory(function(res){
            // Transactions List
            this.transactions =[];
            for(var i =0; i<res.payload.length;i++){
                var t ={
                    'sId':res.payload[i].statementId,
                    'tId':res.payload[i].transactionId,
                    'tStatus':res.payload[i].transactionStatus,
                    'tType':res.payload[i].transactionType,
                    'tMonth':'Oct',
                    'tDay':28,
                    'currency':res.payload[i].currency,
                    'amount':res.payload[i].amount,
                    'tMessage':res.payload[i].transactionMessage
                };
                this.transactions.push(t);
            }
            // Get Balance From Cache
            
            if(platformSdk.isDevice){
                platformSdk.nativeReq({
                fn: 'getFromCache',
                ctx: this,
                data: "walletBalance",
                success: function(response){
                    console.log(response);
                },
                error: function(res){
                    console.log(res);
                }  
            }); 
            }
            // Get From Local Storage
            else{
                this.bal = localStorage.getItem('walletBalance');
            }
            
            that.el = document.createElement('div');
            that.el.className = "txHistoryContainer";
            
            that.el.innerHTML = Mustache.render(that.template, {
                transactions: that.transactions,
                balance:this.bal
            });
            
            ctr.appendChild(that.el);
            that.bind();
        }, this);

        var self = this;

        return this;
    };

    module.exports = IndexController;
})(window, platformSdk);