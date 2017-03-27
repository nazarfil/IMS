console.log('Web3 and ethereum loaded');

var Web3 = require('web3');
//import css from 'style.css';
// Check if mist etc. already set a provider
var web3 = new Web3();
if(!web3.currentProvider)
     web3 = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
     

var accounts = web3.eth.accounts;

accounts.forEach( function(v){
    $('#accountsList').append("<option val=\"" + v + "\">" + v + "</option>");
});



var compiled = web3.eth.compile.solidity(contractSource);
var code = compiled.code;
var abi = compiled.info.abiDefinition;

var contract = web3.eth.contract(abi);

function parseAsyncDates(cb, f, prefix) {
    f(function(err, data) {
        if (!err && data) {
            cb(null, prefix + new Date(web3.toDecimal(data) * 1000));
        }
    });
}



console.log(web3);
var accs = web3.eth.accounts;
console.log("Logs of accs",accs);
