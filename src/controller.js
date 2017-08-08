
(function(){
    'use strict';
    angular.module('app').controller('appController', function($log, $scope,$http, $q, $rootScope){

        $log.log('Controller initiated');
        var vm= this;
        //Def client
        vm.client = {fname : 'Jo' , sname:'Do', address:{ street: 'Louise 116', city:'Brussels', country:'Belgium', region:1000}};
        vm.validator = {name:'Jo', id:10};
        vm.auditor = {name:'Jo', id:11};
        //Def person to verify
        vm.toVerify = {fname : 'Jo' , sname:'Do', address:{ street: 'Louise 116', city:'Brussels', country:'Belgium', region:1000}};

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


        //Estiamtes contracts gas
        vm.contract_gas_needed = web3.eth.estimateGas({
            data: binaryContract
        });
        

        //Adds contract to the chain
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

        //Call contract details /addr from blockchain
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

        //Automated running of contract
        vm.addContract();

        //
        vm.closeContract = function(){
            vm.activeIndex = -1;
            vm.activeIndex2 = -1;
        };

        //Verifying if address is in mappign
        vm.checkAddress = function(idx, acc_to_verify){
                //vm.activeIndex2 = idx;
                $log.log('Verifying', acc_to_verify);
                var isIn = vm.contract.verifyAddress.call(acc_to_verify);
                $log.log('Verified ', isIn);
        };

        //Verfiying if a client is into register based in its info
        vm.verifyClient = function(){
            var toHash =    vm.toVerify.fname+
                            vm.toVerify.sname+
                            vm.toVerify.address.street+
                            vm.toVerify.address.region+
                            vm.toVerify.address.city+
                            vm.client.address.country;

            var hashed_info = web3.sha3(toHash);


            $log.log('Verifying', vm.selectAddr, hashed_info);
            var verified_info = vm.contract.verifyClient.call(
                vm.selectedAddr, hashed_info
            )
            $log.log('Verified cleint', verified_info);

        };

        //Sleecting an address from the list
        vm.selectAddr = function(index, addr ){
            vm.activeIndex = index;
            vm.selectedAddr = addr;

        };

        //Adds new client on a chain based on its information
        vm.addClient = function(){
            
            var toHash =    vm.client.fname+
                            vm.client.sname+
                            vm.client.address.street+
                            vm.client.address.region+
                            vm.client.address.city+
                            vm.client.address.country;

            var id_hash = web3.sha3(toHash);
            var desc = 'some hash';
            //Adding new client
                vm.contract.addClient(vm.selectedAddr, id_hash, desc
                ,
                {   from: web3.eth.accounts[0], 
                    gas:1000000
                });
        };

        var verifySignature = function(){
            //UTIL methods
            //PROBABLY DOESN4T WORK ON TESTRPC
            //Prefixed msg

            const hash_msg = new Buffer(id_hash)
            var msg = id_hash;
            const prefix = new Buffer("\x19Ethereum Signed Message:\n32");
            const prefixedMsg = web3.sha3(
                Buffer.concat([prefix, new Buffer(String(msg.length)), hash_msg])
            );


            //EC signature of the msg
            var signature = web3.eth.sign(vm.selectedAddr, '0x'+msg);
            var sig = signature;
            var sig = sig.substr(2, sig.length);
            let r = '0x' + sig.substr(0, 64);
            let s = '0x' + sig.substr(64, 64);
            let v = web3.toDecimal(sig.substr(128, 2)) + 27;
            $log.log('Id Hash', msg);
            //$log.log('V-R-S', v,r,s);
            $log.log('Sending', vm.selectedAddr, msg);
            
            
            
            var verifySignature = vm.contract.verifySignature.call(vm.selectedAddr, msg, v, r, s);
            $log.log('Is signature good?', verifySignature);
        };
        
        //Adds a validator to the chain
        vm.addValidator = function(){
            $log.log('Sending to', vm.selectedAddr, vm.validator);
        
                vm.contract.addValidator(vm.selectedAddr, vm.validator.id , vm.validator.name
                ,
                {   from: web3.eth.accounts[0], 
                    gas:1000000
                });
        };


        //Adds an auditor to the chain
        vm.addAuditor = function(){
            $log.log('Sending to', vm.selectedAddr, vm.validator);
        
                vm.contract.addValidator(vm.selectedAddr, vm.auditor.id , vm.auditor.name
                ,
                {   from: web3.eth.accounts[0], 
                    gas:1000000
                });
        }

        //Signs a message with some address
        // can be 'latest' or 'pending'
        var filter = web3.eth.filter('latest');      
        // watch for changes
        filter.watch(function(error, result){
        if (!error)
            $log.log('Latest Block state',result);
        });

    })

})();