#!/bin/bash -e

geth --networkid 2104 --cache 128 --rpc --rpcapi "db, eth, net, web3 "--rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --nat "any" --mine --minerthreads 1