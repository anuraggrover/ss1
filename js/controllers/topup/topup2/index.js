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
        this.banklist    =  [       
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

    Topup2Controller.prototype.render = function() {
        
        var that = this;

        this.el = $(Mustache.render(this.template, {
            commonbanks: that.commonbanks,
            banklist: that.banklist
        }));

        //var ele = document.getElementsByClassName('.boxInputs');

        //ele.style.display = "none";


        $('body').on('click', '.topupMethod', function(e){
            e.preventDefault();
            $(this).next('.boxInputs').toggle('fast');
        });

        // $('.boxInputs').hide();
            
        // $('.topupMethod').each(function() {
        //     $(this).show(0).on('click', function(e) {
        //         e.preventDefault();
        //         $(this).next('.boxInputs').toggle('fast');
        //     });
        // });
        
        return this;
    };

    module.exports = Topup2Controller;
})();