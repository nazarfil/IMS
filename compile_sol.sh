#!/bin/bash -e
sudo rm IMS.*
sudo solc --optimize -o .  --bin --abi contract.sol 
