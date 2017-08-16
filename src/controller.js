
(function(){
    'use strict';
    angular.module('app').controller('appController', function($log, $scope,$http, $q, $rootScope){

        $log.log('Controller initiated');
        var vm= this;

        //List indexes for active items
        vm.activeIndex = -1;
        vm.activeIndex2 = 0;
        vm.activeIndex3 =-1;
        //Def client
        vm.client = {fname : 'Jo' , sname:'Do', address:{ street: 'Louise 116', city:'Brussels', country:'Belgium', region:1000}};
        vm.validator = {name:'Jo', id:10};
        vm.auditor = {name:'Jo', id:11};
        
        //Def person to verify
        vm.toVerify = {fname : 'Jo' , sname:'Do', address:{ street: 'Louise 116', city:'Brussels', country:'Belgium', region:1000}};
        vm.title = 'Ethereum app';
        
        //Contract to mine
        vm.minedContract = {address: '', abi:abiContract, desc:'Mined Contract'}
        //Arra of all accounts on the node
        vm.accounts = [];
        //Address on which we work: include, change etc
        vm.target_adr = '';
        //main address, sending transaction 
        vm.main_adr ='';

        //Extracted Contract form the chain
        vm.contract = {};
        vm.hashedInfo = "";
        vm.signedHash = "0x0";
        vm.signatureStatus='Unknown';
        //
        vm.investigations = [];
        vm.investigationTarget = '';
        //Web3 interface and netwokr connection
        var util = require('ethereumjs-util');
        var Web3 = require('web3');
        var web3 = new Web3();
        if(!web3.currentProvider){
                    web3 = new Web3(new web3.providers.HttpProvider("http://localhost:8545"));

        }
        vm.accounts = web3.eth.accounts;
        vm.main_adr = web3.eth.accounts[0];

        //Estiamtes contracts gas
        var makeGasEstimation = function(code){
            return web3.eth.estimateGas({data:code})
        };

        vm.contract_gas_needed = makeGasEstimation(binaryContract);
        vm.changeMain = function(idx, acc){
            vm.main_adr = acc;
            vm.activeIndex2 = idx;
        }

        //Adds contract to the chain
        vm.addContract = function(){
           // var compiledCode = require('../contract.js');
            web3.eth.sendTransaction( 
                    {   from: web3.eth.accounts[0], 
                        data: binaryContract, 
                        gas: '2700000'}, 
                    function(err, transactionHash) {
                if (!err){
                    var receipt = web3.eth.getTransactionReceipt(transactionHash);
                    console.log("Contract address" , receipt);
                    vm.minedContract.address = receipt.contractAddress;
                    vm.minedContract.abi = abiContract;
                    $log.log(vm.minedContract);
                    $scope.$apply();
                }     
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

        vm.changeContract = function(adr, abi){
            $log.log('chng', adr);
            vm.minedContract.abi = abi;
            vm.minedContract.address = adr;
        }
        //Verifying if address is in mappign
        vm.checkAddress = function(idx, acc_to_verify){
                //vm.activeIndex2 = idx;
                $log.log('Verifying', acc_to_verify);
                var isIn = vm.contract.verifyAddress.call(acc_to_verify);
                $log.log('Verified ', isIn);
        };

        //Verfiying if a client is into register based in its info
        vm.verifyClient = function(){
            var hashed_info = vm.hashedInfo;

            $log.log('Verifying', vm.selectAddr, hashed_info);
            var verified_info = vm.contract.verifyClient.call(
                vm.target_adr, hashed_info
            )
            $log.log('Verified cleint', verified_info);

        };

        vm.hashInfo = function(){
            var toHash =    vm.toVerify.fname+
                            vm.toVerify.sname+
                            vm.toVerify.address.street+
                            vm.toVerify.address.region+
                            vm.toVerify.address.city+
                            vm.client.address.country;

            vm.hashedInfo = web3.sha3(toHash);
        };

        vm.generateSignature = function(){
            var msg = new Buffer(vm.hashedInfo);
            const sig = web3.eth.sign(vm.target_adr, '0x' + msg.toString('hex'));
            vm.signedHash = sig;
        };
        //Sleecting an address from the list
        vm.selectAddr = function(index, addr ){
            vm.activeIndex = index;
            vm.target_adr = addr;

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
            var desc = 'Cleints hashed info';
            //Adding new client
                vm.contract.addClient(vm.target_adr, id_hash, desc
                ,
                {   from: vm.main_adr, 
                    gas:1000000
                });
        };

        vm.verifySignature = function(){
                   /*   
            var msg = new Buffer('hello');
            //var msgBuffer = new Buffer(msg, 'hex');
            //EC signature of the msg
            var signature = web3.eth.sign(vm.target_adr,'0x'+ msg.toString('hex'));
            //var signature = vm.signedHash;
            signature = signature.split('x')[1];
            var r = new Buffer(signature.substring(0, 64), 'hex')
            var s = new Buffer(signature.substring(64, 128), 'hex')
            var v = (parseInt(signature.substring(128, 130)) + 27).toString();

            var verifySignature = vm.contract.verifySignature.call(vm.target_adr, msg, v, r, s);
            //$log.log('V-R-S', v,r,s);
            //$log.log('Sending', vm.target_adr, msgBuffer);
           // $log.log('Msg', msgBuffer);
            $log.log('r', r);
            $log.log('s', s);
            $log.log('v', v,(parseInt(signature.substring(128, 130)) + 27).toString());
            
            var msg = new Buffer('hello');
            */
            var msg = new Buffer(vm.hashedInfo);
            var sig = vm.signedHash;
            const res = util.fromRpcSig(sig);

            const prefix = new Buffer("\x19Ethereum Signed Message:\n");
            const prefixedMsg = util.sha3(
            Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
            );

            const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
            const addrBuf = util.pubToAddress(pubKey);
            const addr    = util.bufferToHex(addrBuf);
            vm.signatureStatus = addr;
            console.log(vm.target_adr,  addr);
            var verifySignature = vm.contract.verifySignature.call(prefixedMsg , res.v, res.r, res.s);
            var verifySignatureAddr = vm.contract.verifySignature.call(vm.target_adr, prefixedMsg , res.v, res.r, res.s);
            $log.log('Signature returned', verifySignature);
            //var verifySignature = vm.contract.verifySignature.call(msg, v, r, s);
            //$log.log('Is signature good?', verifySignature);
        };
        
        //Adds a validator to the chain
        vm.addValidator = function(){
            $log.log('Sending to', vm.target_adr, vm.validator);
        
                vm.contract.addValidator(vm.target_adr, vm.validator.id , vm.validator.name
                ,
                {   from: vm.main_adr, 
                    gas:1000000
                });
        };


        //Adds an auditor to the chain
        vm.addAuditor = function(){
            $log.log('Sending to', vm.target_adr, vm.validator);
        
                vm.contract.addAuditor(vm.target_adr, vm.auditor.id , vm.auditor.name
                ,
                {   from: vm.main_adr, 
                    gas:1000000
                });
        }

        //Signs a message with some address
        // can be 'latest' or 'pending'
        vm.changeClientData = function(){
            var msg = new Buffer(vm.hashedInfo);
            var sig = vm.signedHash;
            const res = util.fromRpcSig(sig);

            const prefix = new Buffer("\x19Ethereum Signed Message:\n");
            const prefixedMsg = util.sha3(
            Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
            );

            
            vm.contract.changeClientData(vm.target_adr, vm.hashedInfo, {
                from: vm.main_adr,
                gas: 1000000
            });
        }

        vm.addInvestigation = function(){
            vm.contract.addInvestigation(vm.target_adr, 
            {  from: vm.main_adr,
                gas: 1000000})
        }

        vm.endInvestigation =  function(){
            vm.contract.endInvestigation( vm.target_adr,
            {
                from: vm.main_adr,
                gas: 1000000
            })
        }
        vm.showInvestigation = function(){
            vm.investigationTarget = vm.contract.getInvestigatedAdr.call(vm.target_adr);

        }

        var filter = web3.eth.filter('latest');      
        // watch for changes
        filter.watch(function(error, result){
        if (!error)
            $log.log('Latest Block state',result);
        });

    })

})();