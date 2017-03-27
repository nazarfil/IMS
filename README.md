# IMS
## Web3 library builds incorrectly with Webpack ##
### Error ###
https://github.com/ethereum/web3.js/issues/555
Missing semicolon on build
```
  if (options.value > 0) {
     var constructorAbi = abi.filter(function (json) {
        return json.type === 'constructor' && json.inputs.length === args.length;
          })[0] || {};
  if (!constructorAbi.payable) {
     throw new Error('Cannot send value to non-payable constructor');
     }
  }
```
### Workaround  ###
Add semicolon to built bundle.js
```
   if (options.value > 0) {
      var constructorAbi = abi.filter(function (json) {
         return json.type === 'constructor' && json.inputs.length === args.length;
            })[0] || ; {};

           if (!constructorAbi.payable) {
              throw new Error('Cannot send value to non-payable constructor');
            }
        }
```
