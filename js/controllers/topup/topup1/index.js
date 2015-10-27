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
        this.keypad = [
                        { keypadvalue: 1 },
                        { keypadvalue: 2 },
                        { keypadvalue: 3 },
                        { keypadvalue: 4 },
                        { keypadvalue: 5 },
                        { keypadvalue: 6 },
                        { keypadvalue: 7 },
                        { keypadvalue: 8 },
                        { keypadvalue: 9 },
                        { keypadvalue: '.' },
                        { keypadvalue: 0 },
                        { keypadvalue: '.' },
                    ]; 
                    

    };

    Topup1Controller.prototype.render = function() {
        this.el = $(Mustache.render(this.template, {
                defaultAmounts: this.defaultAmounts,
                keypad: this.keypad
        }));



        var that = this;

        $(document).ready(function(){
            window.onload = function() {
                var labels = document.getElementsByTagName('label');
                for (var i = 0; i < labels.length; i++) {
                    disableSelection(labels[i]);
                }
            };
            function disableSelection(element) {
                if (typeof element.onselectstart != 'undefined') {
                    element.onselectstart = function() { return false; };
                } else if (typeof element.style.MozUserSelect != 'undefined') {
                    element.style.MozUserSelect = 'none';
                } else {
                    element.onmousedown = function() { return false; };
                }
            }   
        });

        $('body').on('click', '.amount', function(){    
            
            // Remove any older Active Default Money Values
            var ele = $('.activeamount');
            var p2pValue = $('#p2pValue');

            ele.removeClass('activeamount');                    
            //debugger;
            // Add New Active Amount Class
            $(this).addClass('activeamount');                
            $('.action_next').addClass('activebutton');     

            // Updates New Input
            //$('#p2pValue')[0].value = this.innerHTML;
            p2pValue.val(this.innerText);
            //p2pValue[0].placeholder = this.innerHTML;
             
        });

        // Trigger Input Key Press :: Check Compatability With All Android Versions For On Input Event

        $('body').on('input','#p2pValue',function(e){
            
            var input = e.currentTarget.value;
            var ele = $('.activeamount');
    
            $('.action_next').toggleClass('activebutton', input);   // Toggles Active Next Button Class Based on Input Entered
            
            if(!input && ele){
                ele.removeClass('activeamount');                    // Removes existing Active Amount Classes
            }
            else{
                $('.amount').each(function(index){
                    if( ($('.amount')[index].innerText) === input ){
                        ele.removeClass('activeamount');
                        $(this).addClass('activeamount');                // Adds Active Amount Class
                    }
                });
            }
        });

        // NumPad Response

        $('body').on('click', '.number_numpad', function(){    
            
            var key = this.innerText;
            var p2pValue = $('#p2pValue');

            $(p2pValue).val(p2pValue.val() + key);
        });

        $('body').on('click', '.action_cross', function(){        
            
            var p2pValue = $('#p2pValue');
            var v = p2pValue.val();
            
            v = v.substring(0, v.length-1);
            $(p2pValue).val(v);
        
        });

        return this;
    };

    module.exports = Topup1Controller;
})();