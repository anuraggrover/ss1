(function () {
    'use strict';

    var Topup1Controller = function (options) {
        this.template = require('raw!../../../../templates/topup/topup1/index.html');
        // Default Amounts For Topup Screen
        this.defaultAmounts = [
                                { amount:500},
                                { amount:1000},
                                { amount:5000}
                            ];
    };

    Topup1Controller.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
                defaultAmounts: this.defaultAmounts
        }));

        var that = this;

        $('body').on('click', '.amount', function(){    

            // Remove any older Active Default Money Values
            var ele = $('.activeamount'); 
            ele.removeClass('activeamount');                    

            // Add New Active Amount
            $(this).addClass('activeamount');                
            $('.topupNextButton').addClass('activebutton');     

            // Updates New Input
            $('#p2pValue').val(this.innerHTML); 
            
        });

        // Trigger Input Key Press :: Check Compatability With All Android Versions For On Input Event

        $('body').on('input','#p2pValue',function(e){
            console.log("Keypressed");
            var input = e.currentTarget.value;
            var ele = $('.activeamount');
                
            $('.topupNextButton').toggleClass('activebutton', input);   // Toggles Active Next Button Class Based on Input Entered
            
            if(!input && ele){
                ele.removeClass('activeamount');                    // Removes existing Active Amount Classes
            }
            else{
                $('.amount').each(function(index){
                    if( ($('.amount')[index].innerHTML) === input ){
                        ele.removeClass('activeamount');
                        $(this).addClass('activeamount');                // Adds Active Amount Class
                    }
                });
            }
        });

        return this;
    };

    module.exports = Topup1Controller;
})();