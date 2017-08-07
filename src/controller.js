
(function(){
    'use strict';
    angular.module('app').controller('appController', function($log, $scope,$http, $q, $rootScope){

        String.prototype.hashCode = function() {
            var hash = 0, i, chr;
            if (this.length === 0) return hash;
            for (i = 0; i < this.length; i++) {
                chr   = this.charCodeAt(i);
                hash  = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };
        
        function decimalToHexString(number)
        {
            if (number < 0)
            {
                number = 0xFFFFFFFF + number + 1;
            }

            return number.toString(16).toUpperCase();
        }

        $log.log('Controller initiated');
        var vm= this;
        //Def client
        vm.client = {fname : 'Jo' , sname:'Do', address:{ street: 'Louise 116', city:'Brussels', country:'Belgium', region:1000}};
        vm.validator = {name:'Jo', id:10};
        vm.auditor = {name:'Jo', id:11};

        vm.title = 'Ethereum app';
        //List indexes for active items
        vm.activeIndex = -1;
        vm.activeIndex2 = -1;

        //Contract to mine
        vm.minedContract = {address: '', abi:abiContract, desc:'Mined Contract'}

        //Arra of all accounts on the network
        vm.accounts = [];
        vm.selectedAddr = '';
        //Extracted Contract form the chain
        vm.contract = {};

        //Web3 interface and netwokr connection
        var Web3 = require('web3');
        var web3 = new Web3();
        if(!web3.currentProvider)
            web3 = new Web3(new web3.providers.HttpProvider("http://localhost:8545"));
            
        $log.log('Web 3 loaded', web3.eth.accounts);
        vm.accounts = web3.eth.accounts;

        vm.addContract = function(){

           // var compiledCode = require('../contract.js');
            web3.eth.sendTransaction({from:web3.eth.accounts[0], data: binaryContract, gas: '4700000'}, function(err, transactionHash) {
                if (!err)
                console.log(transactionHash);        
                var receipt = web3.eth.getTransactionReceipt(transactionHash);
                console.log("Contract Receipt" , receipt);
                console.log("Contract address" , receipt.contractAddress);
                vm.minedContract.address = receipt.contractAddress;
                $log.log(vm.minedContract);
                $scope.$apply();
            });


        };

        vm.showContract = function (){
                var abi = JSON.parse(vm.minedContract.abi);
                var addr = vm.minedContract.address
                vm.contract = web3.eth.contract(abi).at(addr);
                vm.events = vm.contract.allEvents();
                $log.log('Extracted contract', vm.contract);
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

        vm.selectAddr = function(index, addr ){
            vm.activeIndex = index;
            vm.selectedAddr = addr;

        };

        vm.addClient = function(){
            
            var toHash = vm.client.fname+vm.client.sname+vm.client.address.street+vm.client.address.region+vm.client.address.city+vm.client.address.country;
            var num_to_string = decimalToHexString(toHash.hashCode());
            
            $log.log('Hash of string', num_to_string);
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

    })

})();