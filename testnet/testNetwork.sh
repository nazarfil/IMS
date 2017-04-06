#!/bin/bash -e

echo 'Starting Private Test Network'
echo 'Test dir "/home/fnazar/eth_test_net"'
 
geth --datadir "/home/fnazar/eth_test_net" --networkid 2104 --testnet --identity "Main Node" --cache 128 --rpc --rpcapi "db, eth, net, web3" --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcport 8546 --rpccorsdomain "*" --nat "any"  init Genesis.json 
geth --datadir "/home/fnazar/eth_test_net" --networkid 2104 --testnet --identity "Main Node" --cache 128 --rpc --rpcapi "db, eth, net, web3" --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcport 8546 --rpccorsdomain "*" --nat "any" console
