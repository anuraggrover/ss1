(function () {
    'use strict';

    var Topup1Controller = function (options) {
        this.template = require('raw!../../../../templates/topup/topup1/index.html');
        // Default Amounts For Topup Screen
        this.defaultAmounts = [
                                { amount:500},
                                { amount:1000},
                                { amount:2000}
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

        // Numpad Delete Response

        $('body').on('click', '.action_cross', function(){        
            
            var p2pValue = $('#p2pValue');
            var v = p2pValue.val();
            
            v = v.substring(0, v.length-1);
            $(p2pValue).val(v);

            $('.activeamount').removeClass('activeamount');
            // Remove Active Button If Empty
            if($(p2pValue).val() === ''){
                $('.action_next').removeClass('activebutton');     
            }
        });

        // Number Pad Append Digit

        $('body').on('click', '.number_numpad', function(){    
            
            var key = this.innerText;
            var p2pValue = $('#p2pValue');

            $(p2pValue).val(p2pValue.val() + key);

            // Activate next button
            $('.action_next').addClass('activebutton');  

            var input = $(p2pValue).val();
            var ele = $('.activeamount');
 
            if(input)
            {
                $('.amount').each(function(index){
                    if( ($('.amount')[index].innerText) === input ){
                        ele.removeClass('activeamount');
                        $(this).addClass('activeamount');                // Adds Active Amount Class
                    }
                });
            }

            // var options  = {
            //     newvalue: this.innerText,
            //     oldvalue: $('#p2pValue').val(),
            //     event: "append"
            // };
            // var keyBoard = require('../../../util/keyboard');
            // var key = new keyBoard(options);
            // key.appendDigit(function(val1){
            //     $('#p2pValue').val(val1);
            // });
        });

        return this;
    };

    module.exports = Topup1Controller;
})();