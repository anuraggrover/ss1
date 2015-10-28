(function () {
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
        var addMoney = this.el.getElementsByClassName('addMoney')[0];

        var fn_addMoney = function(ev){
            ev.preventDefault();

            var data = {
                currency: "INR",
                amt: that.transactionObj.amt,
                paymentMethod: "Citibank"
            };

            App.PaymentService.addBalance(data, function(res){
                App.router.navigateTo('/', res);
            }, this);
        };


        addMoney.addEventListener('click', fn_addMoney);

        $('body').on('click', '.topupMethod', function(e){
            e.preventDefault();
            $(this).next('.boxInputs').toggle('fast');
        });

        $('body').on('click', '.card', function(e){
            //e.preventDefault();
            $('.boxInputs-netbanking').hide();
            $('.boxInputs-card').show();
        });

        $('body').on('click', '.netbanking', function(e){
            //e.preventDefault();
            $('.boxInputs-card').hide();
            $('.boxInputs-netbanking').show();
        });

        $('body').on('click', '.bankContainer', function(e){
            e.preventDefault();
            $('#bankType').val($(this).find('.bankName')[0].innerHTML);
            $('#bankType').css('color','#1da8e8');
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
})();