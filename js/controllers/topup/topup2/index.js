(function (W, events) {
    'use strict';

    var Topup2Controller = function (options) {
        this.template = require('raw!../../../../templates/topup/topup2/index.html');                    
    };

    Topup2Controller.prototype.bind = function(App){

        var that = this;
        var valid = {};
        
        var addMoney = this.el.getElementsByClassName('addMoney')[0];
        var paymentMethod = document.getElementById('card_number');
        
        // Card Variables
        var cardnum = document.getElementById('card_number');
        var cardicon = this.el.getElementsByClassName('card-type-icon')[0];
        var expiry = document.getElementById('card_expiry');
        var cvv = document.getElementById('card_cvv');

        // Add Money To The Wallet Api Call
        var fn_addMoney = function(ev){
            ev.preventDefault();

            if (this.classList.contains('activebutton')) {

                // Identify Payment Method
                var pmethod = paymentMethod.getAttribute('data-method');
                var data;

                switch(pmethod){
                    // Net Banking 
                    case 'NB':
                        data ={
                              "paymodeId": pmethod,
                              "payOptCode": $('#bankType')[0].value,
                              "currency": "INR",
                              "amount": that.transactionObj.amt
                         }; 
                    break;
                
                    // Card (Visa/Master/Amex)
                    case 'CARD':
                         var ctype = cardnum.getAttribute('data-cardtype');
                         data ={
                              "paymodeId": pmethod,
                              "payOptCode": pmethod+'_'+ctype,
                              "cardNumber": cardnum.value.replace(/\D/g, ''),
                              "cardExpiry": expiry.value,
                              "cvv": cvv.value,
                              "nameOnCard": "Hemank Sabharwal",
                              "currency": "INR",
                              "amount": that.transactionObj.amt
                         }; 
                        
                    break;
                }

                // Temp Data For Temp Add Money API :: REMOVE From Front End 
                var data_temp = {
                    currency: "INR",
                    amt: that.transactionObj.amt,
                    paymentMethod: "Citibank"
                };
                
                // Initiate Payment Gets Back a URL To Be Intercepted
                App.PaymentService.initiatePayment(data, function(res){
                    console.log(res); 
                }, this);
                
                // Add Balance API :: Temp
                App.PaymentService.addBalance(data_temp, function(res){
                    // If Add Balance Was Successfull :: Show Success Illustration Or FAilure Illustration Accordingly 
                    App.router.navigateTo('/', res);
                }, this);
            }
            else{
                if (platformSdk.bridgeEnabled) PlatformBridge.showToast("Please Select Payment Option.");
                else console.log("Please Select Some Payment Option.");
            }
        };

        // Luhn Check :: For Validating Credit Card And Debit Card Numbers On Client Side :: Let The User Know Using a Tool Tip Alert

        var luhn_check_card_number = function (value) {
            
            if (/[^0-9-\s]+/.test(value)) return false;

            var nCheck = 0, nDigit = 0, bEven = false;
            value = value.replace(/\D/g, "");

            for (var n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n);
                nDigit = parseInt(cDigit, 10);

                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) === 0;
        };

        // Validate the CVV For Different Card Types
        var fn_validateCvv = function(ev){
            var that = this;
            var cardtype = cardnum.getAttribute('data-cardtype');
            var cvv = this.value;
            switch(cardtype){
                // Visa and Master Card CVV Requirement :: 3 digits
                case 'Visa':
                case 'MasterCard':
                    that.maxLength = 3;
                    if (!/[0-9]{3}/.test(cvv)) {
                        if (ev.type === "blur") that.classList.add('error');
                        events.publish('validate.payment', {key: 'cvv', value: false });
                    } else {
                        if (ev.type === "blur") that.classList.remove('error');
                        events.publish('validate.payment', {key: 'cvv', value: true });
                    }
                break;
                // Amex CVV Requirement :: 4 digits
                case 'Amex':
                    that.maxLength = 4;
                    if (!/[0-9]{4}/.test(cvv)) {
                        if (ev.type === "blur") that.classList.add('error');
                        events.publish('validate.payment', {key: 'cvv', value: false });
                    } else {
                        if (ev.type === "blur") that.classList.remove('error');
                        events.publish('validate.payment', {key: 'cvv', value: true });
                    }
                break;
            }
        };

        // Validate Full Card After Card Number looses Focus
        var fn_validateCard = function(ev){
            
            var that = this;
            var cardtype = this.getAttribute('data-cardtype');
            var cardnumber = this.value.replace(/\D/g, '');     // Remove the Spaces from In Between
            var luhn_check = luhn_check_card_number(cardnumber);
            console.log("Luhn Check is :-"+luhn_check);
            
            if (cardtype !== undefined){
                switch(cardtype){
                    case 'Visa':
                        if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardnumber) || !luhn_check) {
                            that.classList.add('error');
                            events.publish('validate.payment', {key: 'cc', value: false });
                        } else {
                            that.classList.remove('error');
                            events.publish('validate.payment', {key: 'cc', value: true});
                        }
                    break;
                    case 'MasterCard':
                        if (!/^5[1-5][0-9]{14}$/.test(cardnumber) || !luhn_check) {
                            that.classList.add('error');
                            events.publish('validate.payment', {key: 'cc', value: false });
                        } else {
                            that.classList.remove('error');
                            events.publish('validate.payment', {key: 'cc', value: true});
                        }
                    break;
                    case 'Amex':
                        if (!/^3[47][0-9]{13}$/.test(cardnumber) || !luhn_check) {
                            that.classList.add('error');
                            events.publish('validate.payment', {key: 'cc', value: false });
                        } else {
                            that.classList.remove('error');
                            events.publish('validate.payment', {key: 'cc', value: true});
                        }
                    break;
                }
            }
        };

        // Set the Card Type According To the Card Number Being Entered 
        var fn_validateCardType = function(ev){
            
            // Backspace
            if (ev.which === 8) {
                // Reset Card Icon If Value Less than 2
                if(this.value.length < 2){
                    cardicon.innerHTML = "";
                    cardicon.className = "card-type-icon";
                }
                return;
            }
            
            var $target, digit, length, re, upperLength, value;
            
            digit = String.fromCharCode(ev.which);      // Number Always Else The Key Code

            // If Anything Except Numbers is Entered return and Dont Check Also Remove 
            if (!/^\d+$/.test(digit)) {
                this.value = this.value.replace(/\D/g, '');     // Actual Length 
                return;
            }

            // After the First Two Digits
            if (this.value.length >= 2){
                var start = this.value.substr(0, 2);
                // Visa 
                if (/^4[0-9]/.test(start)){
                    cardicon.className = "card-type-icon visa";
                    cardnum.setAttribute('data-cardtype', "Visa");
                    re = /(?:^|\s)(\d{4})$/;
                    upperLength = 16;
                    this.maxLength = 19;
                } 
                // Master Card
                else if (/^5[1-5]/.test(start)){
                    cardicon.className = "card-type-icon mastercard";
                    cardnum.setAttribute('data-cardtype', "MasterCard");
                    re = /(?:^|\s)(\d{4})$/;
                    upperLength = 16;
                    this.maxLength = 19;
                }
                // Amex Card 
                else if (/^3[47]/.test(start)){
                    cardicon.className = "card-type-icon amex";
                    cardnum.setAttribute('data-cardtype', "Amex");
                    re = /^(\d{4}|\d{4}\s\d{6})$/;
                    upperLength = 15;
                    this.maxLength = 17;
                }
            } 
            // First Two Digits Not Present
            else if (this.value.length === 0){
                cardicon.innerHTML = "";
                cardicon.className = "card-type-icon";
            }
            
            $target = $(ev.currentTarget);
            value = $target.val();
            length = (value.replace(/\D/g, '')).length;     // Actual Length 
            
            var cardtype = cardnum.getAttribute('data-cardtype');
            
            if (cardtype){
                if (length >= upperLength) {
                    this.value = this.value.slice(0, this.value.length);
                    return setTimeout(function() {
                        return expiry.focus();
                    });
                }
                if (re.test(value)) {
                    ev.preventDefault();
                    return setTimeout(function() {
                        return $target.val(value + ' ');
                    });
                }
            } 
        };

        var fn_expiry = function(ev){
            
            if (ev.which === 8) return;
            
            if(this.value.length == 5) cvv.focus();
            if (this.value.indexOf('/') === -1){
                if (this.value.length >= 3){
                    this.value = this.value.substr(0, 2) + '/' + this.value.substr(2, this.value.length);
                } else if (this.value.length === 2){
                    this.value = this.value + '/';
                }    
            }
        };

        // Validate Expiry : By Date 
        var fn_validateExpiry = function(ev){
            
            var that=this;
            var result = false;
            
            var currentYear = (new Date().getFullYear())%100;
            var dValue = this.value.split('/');
            var pattern = /^\d{2}$/;

            if(this.value.length !== 5){
                result = true;
            }

            if (dValue[0] < 1 || dValue[0] > 12)
                result = true;

            if (!pattern.test(dValue[0]) || !pattern.test(dValue[1]))
                result = true;

            if (dValue[1] && dValue[1] < currentYear)
                result = true;

            if (!result) {
                that.classList.remove('error');
                events.publish('validate.payment', {key: 'expires', value: true });   
            }
            else{ 
                that.classList.add('error');
                events.publish('validate.payment', {key: 'expires', value: false });   
            }
        };

        // If All the Things are Validated Correctly :: Add Money Button Corrected Accordingly
        var validateObject = function(){
            if (valid.type === "cc" && valid.cc && valid.cvv && valid.expires){
                addMoney.classList.add('activebutton');
                paymentMethod.setAttribute('data-method', "CARD");
            } else if (valid.type === "netbanking" && valid.bank){
                addMoney.classList.add('activebutton');
                paymentMethod.setAttribute('data-method', "NB");
            } else {
                addMoney.classList.remove('activebutton');
            }
        };

        // For Validation Of The Correct Digits
        var validObject = events.subscribe('validate.payment', function(data){
            valid[data.key] = data.value;
            validateObject();
        });

        // Confirm Add Money Event 
        addMoney.addEventListener('click', fn_addMoney);
        
        // Card Number Events
        cardnum.addEventListener('keyup', fn_validateCardType);   // Add VISA/MASTER/AMEX
        cardnum.addEventListener('blur', fn_validateCard);        // Validate The Card
        
        // CVV Events
        cvv.addEventListener('blur', fn_validateCvv);
        cvv.addEventListener('keyup', fn_validateCvv);
        
        // Expiry Events
        expiry.addEventListener('keyup', fn_expiry);            // To Add a  Slash after 2 digits
        expiry.addEventListener('blur', fn_validateExpiry);     // Validate the Expiry


        // Show and Hide Payment Method Options Resp.
        $('body').on('click', '.card', function(e){
            $('.boxInputs-netbanking').hide();
            $('.boxInputs-card').show();
            events.publish('validate.payment', {key: 'type', value: 'cc'});
        });

        // Show and Hide Payment Method Options Resp.
        $('body').on('click', '.netbanking', function(e){
            $('.boxInputs-card').hide();
            $('.boxInputs-netbanking').show();
            events.publish('validate.payment', {key: 'type', value: 'netbanking'});
        });

        // On Selection of Respective Bank :: Get the Bank Filled
        $('body').on('click', '.bankContainer', function(e){
            e.preventDefault();
            $('#bankType').val($(this).attr('data-bcode'));
            $('#bankType').css('color','#1da8e8');
            events.publish('validate.payment', {key: 'bank', value: true });
        });

        // On Changing Banks From The List In The Select Option   
        $('body').on('change', '#bankType', function(ev){
            if (this.value != "hide") {
                events.publish('validate.payment', {key: 'bank', value: true });
            }
        });
    };


    // Render Topup Controller
    Topup2Controller.prototype.render = function(App, transactionObj) {
        // Transaction Objects Contain The Payment Options :: CARD and NetBanking

        this.commonbanks = [];
        this.banklist =  [];
        
        if(transactionObj.data && transactionObj.data.NB){
            
            this.banklist = transactionObj.data.NB;

            // Common Banks :: First 6 
            var chunk;
            if(this.banklist.length < 6) chunk = this.banklist.length ;
            else chunk = 6;

            for (var i=0; i<this.banklist.length ; i++){
                this.commonbanks.push(this.banklist[i]);
            }
            //console.log(this.commonbanks);
            //console.log(this.banklist);

            
        }
    
        this.transactionObj = transactionObj;
        this.el = document.createElement('div');
        this.el.className = "topupContainer2";
        this.el.innerHTML = Mustache.render(this.template, {
            amt: transactionObj.amt,
            commonbanks: this.commonbanks,
            banklist: this.banklist
        });

        App.container.appendChild(this.el);
        this.bind(App);
    
    };

    module.exports = Topup2Controller;
})(window, platformSdk.events);