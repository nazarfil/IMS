# IMS
## Requirements ##
node, npm, docker
## Run network ##
### Run testing network ###
Pull docker container with TestRPC and run it
```
    docker pull harshjv/testrpc
    docker run -d -p 8545:8545 harshjv/testrpc
```
### Start Docker container ###
To start as a passive Etheruem client
```
    cd docker/node_1
    docker-compose build
    docker run -it -p 8545:8545 -p 30303:30303 enode/gen bash
```
To start as a passive Etheruem client
```
    cd docker/miner
    docker-compose build
    docker run -it -p 8545:8545 -p 30303:30303 enode/miner bash
```
Once in a container iitlize the bloackchain
```
    ./node/init_network.sH
```
Create an account and verify it is created
```
    geth account new
    geth accoutn list
```
Run the client on the predefined network
```
    ./node/testNetworksH
```
## Run application  ##
Add semicolon to built bundle.js

