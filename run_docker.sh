#!/bin/bash

sudo docker run -v $PWD:/sol fnazar/soliditybuilder
cp contract.js IMS/contract.js
