
(function(){
    'use strict';
    angular.module('app').controller('appController', function($log, $scope,$http, $q){

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

       var asyncCompilation =function( code) {
           var res =  web3.eth.compile.solidity(code);
           return $q.when(res);
       }

       asyncCompilation(contractSource).then( function(res){
        var compiledCode = res;
        var abi = compiledCode.info.abiDefinition;
        vm.abi = abi;
        $log.log('Compilers ', web3.eth.getCompilers());
        $log.log('Comiled contract', compiledCode);
        var ballot_sol_imsContract = web3.eth.contract(abi);
        vm.mineContract = function(){
            var ballot_sol_ims = ballot_sol_imsContract.new(
        {
            from: web3.eth.accounts[0], 
            data: compiledCode.code, 
            gas: '4700000'
        }, function (e, contract){
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                vm.contracts.push(contract);
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                $log.log('Full contract', contract);
                $scope.$apply();
                
            }
        })
        };
       })
        
        vm.showContract = function (abi, addr, idx){
                
                vm.contract = web3.eth.contract(abi).at(addr);
                vm.activeIndex = idx;
                vm.contractData.coins = vm.contract.verifyIdentity.call();
        };

        vm.closeContract = function(){
            vm.activeIndex = -1;
            vm.activeIndex2 = -1;
        };

        vm.checkAddress = function(acc_to_verify, idx){
                vm.activeIndex2 = idx;
                vm.contractData.check = vm.contract.verifyIdentity.call(acc_to_verify);
        };

        vm.addAddress = function(acc){
            var newAcc = {
                acc:acc,
                fname:'Nazar',
                lname:'Filipchuk',
                addr:'av chat w',
                pep:false
            }
            var added = vm.contract.addIdentity.call(newAcc.acc, newAcc.addr, newAcc.fname, newAcc.lname, newAcc.addr, newAcc.pep);

             $log.info('Response->', added);
       
        };
       //var code = web3.eth.compile.solidity('../contract.sol')
       // var compiled = web3.eth.compile.solidity(contractSource);

    })

})();