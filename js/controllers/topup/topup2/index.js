(function (W, events) {
    'use strict';

    var Topup2Controller = function (options) {
        this.template = require('raw!../../../../templates/topup/topup2/index.html');
        
        // Common Bank List
        this.commonbanks = [
            { bankname:'SBI'},
            { bankname:'HDFC'},
            { bankname:'ICICI'},
            { bankname:'AXIS'},
            { bankname:'CANARA'},
            { bankname:'KOTAK'}
        ];
        // All bank List :: Include Common As Well In These
        this.banklist =  [       
            { bankname:'XYZ'},
            { bankname:'ABC'},
            { bankname:'LMN'},
            { bankname:'MNO'},
            { bankname:'PQR'},
            { bankname:'UVW'},
            { bankname:'DEF'},
            { bankname:'GHI'},
            { bankname:'SBI'},
            { bankname:'HDFC'},
            { bankname:'ICICI'},
            { bankname:'AXIS'},
            { bankname:'CANARA'},
            { bankname:'KOTAK'}
        ];                    
    };

    Topup2Controller.prototype.bind = function(App){

        var that = this;
        var valid = {};
        var addMoney = this.el.getElementsByClassName('addMoney')[0];
        var cardnum = document.getElementById('card_number');
        var cardicon = this.el.getElementsByClassName('card-type-icon')[0];
        var expiry = document.getElementById('card_expiry');
        var cvv = document.getElementById('card_cvv');

        var fn_addMoney = function(ev){
            ev.preventDefault();

            if (!this.classList.contains('activebutton')) return;

            var data = {
                currency: "INR",
                amt: that.transactionObj.amt,
                paymentMethod: "Citibank"
            };

            App.PaymentService.addBalance(data, function(res){
                App.router.navigateTo('/', res);
            }, this);
        };

        var fn_validateCvv = function(ev){
            var that = this;
            var cardtype = cardnum.getAttribute('data-cardtype');
            var cvv = this.value;
            switch(cardtype){
                case 'Visa':
                case 'MasterCard':
                    if (!/[0-9]{3}/.test(cvv)) {
                        if (ev.type === "blur") that.classList.add('error');
                        events.publish('validate.payment', {key: 'cvv', value: false });
                    } else {
                        if (ev.type === "blur") that.classList.remove('error');
                        events.publish('validate.payment', {key: 'cvv', value: true });
                    }
                break;
                case 'Amex':
                    if (!/[0-9]{4}/.test(cvv)) {
                        if (ev.type === "blur") that.classList.add('error');
                        events.publish('validate.payment', {key: 'cvv', value: false });
                    } else {
                        if (ev.type === "blur") that.classList.remove('error');
                        events.publish('validate.payment', {key: 'cvv', value: true });
                    }
                break;
            };
        };

        var fn_validateCard = function(ev){
            var that = this;
            var cardtype = this.getAttribute('data-cardtype');
            var cardnumber = this.value;
            if (cardtype != undefined){
                switch(cardtype){
                    case 'Visa':
                        if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardnumber)) {
                            that.classList.add('error');
                            events.publish('validate.payment', {key: 'cc', value: false });
                        } else {
                            that.classList.remove('error');
                            events.publish('validate.payment', {key: 'cc', value: true});
                        }
                    break;
                    case 'MasterCard':
                        if (!/^5[1-5][0-9]{14}$/.test(cardnumber)) {
                            that.classList.add('error');
                            events.publish('validate.payment', {key: 'cc', value: false });
                        } else {
                            that.classList.remove('error');
                            events.publish('validate.payment', {key: 'cc', value: true});
                        }
                    break;
                    case 'Amex':
                        if (!/^3[47][0-9]{13}$/.test(cardnumber)) {
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

        var fn_validateCardType = function(ev){
            if (this.value.length >= 2){
                var start = this.value.substr(0, 2);
                if (/^4[0-9]/.test(start)){
                    cardicon.className = "card-type-icon visa";
                    cardnum.setAttribute('data-cardtype', "Visa");
                } else if (/^5[1-5]/.test(start)){
                    cardicon.className = "card-type-icon mastercard";
                    cardnum.setAttribute('data-cardtype', "MasterCard");
                } else if (/^3[47]/.test(start)){
                    cardicon.className = "card-type-icon amex";
                    cardnum.setAttribute('data-cardtype', "Amex");
                }
            } else if (this.value.length === 0){
                cardicon.innerHTML = "";
                cardicon.className = "card-type-icon";
            }
        };

        var fn_expiry = function(ev){
            if (ev.which === 8) return;
            if (this.value.indexOf('/') === -1){
                if (this.value.length >= 3){
                    this.value = this.value.substr(0, 2) + '/' + this.value.substr(2, this.value.length);
                } else if (this.value.length === 2){
                    this.value = this.value + '/';
                }    
            }
        };

        var fn_validateExpiry = function(ev){
            if (this.value.length === 5) events.publish('validate.payment', {key: 'expires', value: true });   
            else events.publish('validate.payment', {key: 'expires', value: false });   
        };

        var validateObject = function(){
            if (valid.type === "cc" && valid.cc && valid.cvv && valid.expires){
                addMoney.classList.add('activebutton');
            } else if (valid.type === "netbanking" && valid.bank){
                addMoney.classList.add('activebutton');
            } else {
                addMoney.classList.remove('activebutton');
            }
        };

        var validObject = events.subscribe('validate.payment', function(data){
            valid[data.key] = data.value
            validateObject();
        });

        addMoney.addEventListener('click', fn_addMoney);
        cardnum.addEventListener('keyup', fn_validateCardType);
        cardnum.addEventListener('blur', fn_validateCard);
        cvv.addEventListener('blur', fn_validateCvv);
        cvv.addEventListener('keyup', fn_validateCvv);
        expiry.addEventListener('keyup', fn_expiry);
        expiry.addEventListener('blur', fn_validateExpiry);

        $('body').on('click', '.topupMethod', function(e){
            e.preventDefault();
            $(this).next('.boxInputs').toggle('fast');
        });

        $('body').on('click', '.card', function(e){
            //e.preventDefault();
            $('.boxInputs-netbanking').hide();
            $('.boxInputs-card').show();

            events.publish('validate.payment', {key: 'type', value: 'cc'});
        });

        $('body').on('click', '.netbanking', function(e){
            //e.preventDefault();
            $('.boxInputs-card').hide();
            $('.boxInputs-netbanking').show();
            events.publish('validate.payment', {key: 'type', value: 'netbanking'});
        });

        $('body').on('click', '.bankContainer', function(e){
            e.preventDefault();
            $('#bankType').val($(this).find('.bankName')[0].innerHTML);
            $('#bankType').css('color','#1da8e8');
            events.publish('validate.payment', {key: 'bank', value: true });
        });

        $('body').on('change', '#bankType', function(ev){
            if (this.value != "hide") {
                events.publish('validate.payment', {key: 'bank', value: true });
            }
        });
    };

    Topup2Controller.prototype.render = function(App, transactionObj) {

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