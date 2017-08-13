#!/bin/bash -e

echo 'Starting Private Test Network on network 2104'
 
geth --networkid 2104  --cache 128 --rpc --rpcapi "db, eth, net, web3" --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcport 8545 --rpccorsdomain "*" --nat "any"
