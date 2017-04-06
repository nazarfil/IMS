
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

       var asyncCompilation = function( code) {
            $log.log('Compilers ', web3.eth.getCompilers());
           var res =  web3.eth.compile.solidity(code);
           return $q.when(res);
       }

       asyncCompilation(contractSource).then( function(res){
        var compiledCode = res;
        var abi = compiledCode.info.abiDefinition;
        vm.abi = abi;
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