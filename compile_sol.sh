#!/bin/bash -e
solc --overwrite --optimize -o "./src"  --bin --abi "contract.sol"
echo " Solidty contract compiled"
ls -l "./src" | grep 'IMS.*'
BINARY='tr -d "\n\r" </src/IMS.bin'
echo "binaryContract ='${BINARY}';" > "./src/contract_bin.js"
echo " Binary was written to contract_bin.js"
ABI='tr -d "\n\r" </src/IMS.abi' 
echo "abiContract = '${ABI}';" > "./src/contract_abi.js"
echo " Abi file was written to contract_abi.js"
ls -l "./src" | grep 'contract_*'
