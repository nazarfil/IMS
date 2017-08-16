FROM ubuntu:trusty
RUN apt-get -qq update \
&& sudo apt-get install -y software-properties-common \
&& sudo add-apt-repository -y ppa:ethereum/ethereum \
&& sudo apt-get update -y\
&& sudo apt-get install -y ethereum 

RUN echo "Installed Ethereum"
RUN ls -l 

RUN mkdir /node
ADD . /node

EXPOSE 8545
EXPOSE 30303
EXPOSE 30303/udp

ENTRYPOINT []

