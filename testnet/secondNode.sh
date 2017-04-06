#!/bin/bash -e

geth --datadir "/home/fnazar/eth_test_net" --networkid 2104  --identity "Second Node" --cache 128 --rpc --rpcapi "db, eth, net, web3" --port 30304 --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcport 8547 --rpccorsdomain "*" --nat "any" --mine