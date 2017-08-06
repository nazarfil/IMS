
(function(){
    'use strict';
    angular.module('app').controller('appController', function($log, $scope,$http, $q, $rootScope){

        $log.log('Controller initiated');
        var vm= this;

        vm.activeIndex = -1;
        vm.activeIndex2 = -1;
        vm.contractData = {};
        vm.contract = {};
        vm.title = 'Ethereum app';
        vm.contracts = [];
        vm.accounts = [];
        
        var Web3 = require('web3');
        var web3 = new Web3();
        if(!web3.currentProvider)
            web3 = new Web3(new web3.providers.HttpProvider("http://localhost:8545"));
            
        $log.log('Web 3 loaded', web3.eth.accounts);


        vm.accounts = web3.eth.accounts;

        vm.addContract = function(){

           // var compiledCode = require('../contract.js');
            web3.eth.sendTransaction({from:web3.eth.accounts[0], data: compiledCode, gas: '4700000'}, function(err, transactionHash) {
                if (!err)
                console.log(transactionHash);        
                var receipt = web3.eth.getTransactionReceipt(transactionHash);
                console.log("Contract Receipt" , receipt);
                console.log("Contract address" , receipt.contractAddress);
            });


        };

        vm.showContract = function (abi, addr, idx){
                
                vm.contract = web3.eth.contract(abi).at(addr);
                vm.activeIndex = idx;

                vm.events = vm.contract.allEvents();

                // watch for changes
                vm.events.watch(function(error, event){
                if (!error)
                    console.log(event);
                });
        };

        vm.closeContract = function(){
            vm.activeIndex = -1;
            vm.activeIndex2 = -1;
        };

        vm.checkAddress = function(acc_to_verify, idx){
                vm.activeIndex2 = idx;
                $log.log('Verifying', acc_to_verify);
                vm.contractData.check = vm.contract.verifyIdentity.call(acc_to_verify);
                var resp = vm.contract.getAddresses.call();
                $log.log('Addreses', resp);
        };

        vm.addAddress = function(input){
            var newAcc = {
                acc:input,
                fname:'Naz',
                lname:'Fil',
                addr:'avChatW',
                pep:false
            }
            //vm.contract.changeArray(input, {from: web3.eth.accounts[0], gas:300000});
            
            vm.contract.addIdentity(newAcc.acc, newAcc.fname, newAcc.lname, newAcc.addr, newAcc.pep
                ,
                {   from: web3.eth.accounts[0], 
                    gas:1000000
                });
            

       
        };

        // can be 'latest' or 'pending'
        var filter = web3.eth.filter('latest');      
        // watch for changes
        filter.watch(function(error, result){
        if (!error)
            $log.log('Latest Block state',result);
        });


       //var code = web3.eth.compile.solidity('../contract.sol')
       // var compiled = web3.eth.compile.solidity(contractSource);

    })

})();