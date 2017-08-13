#!/bin/bash -e

docker run enode/private --networkid 2104  --cache 128 --rpc --rpcapi "db, eth, net, web3" --rpcport 8545 --rpccorsdomain "*" --nat "any"
