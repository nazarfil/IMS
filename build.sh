#!/bin/bash -e

solc contract.sol 
CONTRACT=`tr -d "\n\r" < contract.sol`
echo "contractSource = '${CONTRACT}';" > contract.js
echo "contract built successfully"
