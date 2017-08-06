{ test: /\.sol$/, loaders: ["solidity-loader?export=true"]},
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.json$/, loader: "json-loader" },
        { test: /\.jpg$/, loader: "file-loader" },
        { test: /\.bin$/, loader: "file-loader",include: path.join(__dirname, 'src'), }    


    /*
       var asyncCompilation = function( code) {
            $log.log('Compilers ', web3.eth.getCompilers());
           var res =  web3.eth.compile(code);
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
*/