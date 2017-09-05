
(function(){
    'use strict';
    angular.module('app').controller('appController', function($log, $scope,$http, $q, $rootScope){

        $log.log('Controller initiated');
        var vm= this;
        binaryContract = '0x'+binaryContract;
        //List indexes for active items
        vm.activeIndex = -1;
        vm.activeIndex2 = 0;
        vm.activeIndex3 =-1;

        vm.temp_abi = abiContract;
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
                   // web3 = new Web3(new web3.providers.HttpProvider("http://10.15.123.3:8545"));
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
        
        var createContract = function () {
            var defer = $q.defer();
             web3.eth.sendTransaction( 
                    {   from:vm.main_adr, 
                        data: binaryContract, 
                        gas: '2700000',
                        }, 
            function(err, transactionHash)  {
                if(!err){
                    defer.resolve(transactionHash);
                     
                }else{
                    defer.reject(response);
                }
            });
            return defer.promise;
        };
        //Adds contract to the chain
        vm.addContract = function(){

            createContract().then(function(transactionHash){
                var receipt = web3.eth.getTransactionReceipt(transactionHash);
                    console.log("Contract address" , receipt);
                    vm.minedContract.address = receipt.contractAddress;
                    vm.minedContract.abi = abiContract;
            })
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
            var msg = new Buffer(vm.hashedInfo);
            var sig = vm.signedHash;
            const res = util.fromRpcSig(sig);

            const prefix = new Buffer("\x19Ethereum Signed Message:\n");
            const prefixedMsg = util.sha3( Buffer.concat([prefix, new Buffer(String(msg.length)), msg])  );

            const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
            const addrBuf = util.pubToAddress(pubKey);
            const addr    = util.bufferToHex(addrBuf);
            vm.signatureStatus = addr;
            console.log(vm.target_adr,  addr, "DO they match", addr == vm.target_adr);
           /* var verifySignature = vm.contract.verifySignature.call(prefixedMsg , res.v, res.r, res.s);
            $log.log(prefixedMsg, res.v, res.r, res.s);
            $log.log('Signature returned', verifySignature);*/
        };

        vm.verifySignature2 = function(){
            /*
            var msg = new Buffer(vm.hashedInfo);
            var sig = vm.signedHash;
            const res = util.fromRpcSig(sig);

            const prefix = new Buffer("\x19Ethereum Signed Message:\n");
            const prefixedMsg = util.sha3(msg);//util.sha3( Buffer.concat([prefix, new Buffer(String(msg.length)), msg])  );

            const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
            const addrBuf = util.pubToAddress(pubKey);
            const addr    = util.bufferToHex(addrBuf);
            vm.signatureStatus = addr;
            console.log(vm.target_adr,  addr);
            var verifySignature = vm.contract.verifySignature.call(prefixedMsg , res.v, res.r, res.s);
            $log.log(prefixedMsg, res.v, res.r, res.s);
            $log.log('Signature returned', verifySignature);
            */
            var msg = web3.sha3("hello");
            const sig = web3.eth.sign(vm.target_adr, msg);
            var r = "0x" + sig.slice(2, 66);
            var s = "0x" + sig.slice(66, 132);
            var v = new Buffer(sig.slice(130, 132), "hex");
                //v = 27;
            $log.log("r: ", r, "s: ", s, "v: ", v);
            var h = util.sha3(msg);
            var verifySignature = vm.contract.verifySignatureStr.call(vm.target_adr,h , 27, r, s);
            $log.log(verifySignature);
            var verifySignature = vm.contract.verifySignatureStr.call(vm.target_adr,h , 28, r, s);
            $log.log(verifySignature);
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
            const prefixedMsg = util.sha3( Buffer.concat([prefix, new Buffer(String(msg.length)), msg])  );

            const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
            const addrBuf = util.pubToAddress(pubKey);
            const addr    = util.bufferToHex(addrBuf);
            
            if(addr == vm.target_adr ){
                vm.contract.changeClientData(vm.target_adr, vm.hashedInfo, {
                    from: vm.main_adr,
                    gas: 1000000
                });
            }else{
                vm.contract.failSugnature.call();
            }


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
