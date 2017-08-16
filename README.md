# IMS
## Requirements ##
node, npm, docker
## Run network ##
cli commands to start the network
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
## Compile the contract ##
cli commands to compile the code
From the source folder run
```
    ./compile_sol.sh
```
Compiles the code and parses it ti js files
## Run application  ##
cli commands to run the applicaiton
From the source folder run 

```
    npm install
    webpack
```
Creates a bundle.js files with the dependencies to be included to the application
Open the index.html file in a browser

