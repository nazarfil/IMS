
(function(){
    'use strict';
    angular.module('app').controller('appController', function($log){

        $log.log('Controller initiated');
        var vm= this;
        vm.title = 'Ethereum app';

        var Web3 = require('web3');
        var web3 = new Web3();
        if(!web3.currentProvider)
            web3 = new Web3(new web3.providers.HttpProvider("http://localhost:8545"));
            
        $log.log('Web 3 loaded', web3.eth.accounts);
        vm.accounts = web3.eth.accounts;

       
        
    })

})();