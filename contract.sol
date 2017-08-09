pragma solidity ^0.4.6;

contract IMS {
    
    event feedBack(
        address indexed sender,
        address indexed data,
        string out
    );
    event stringsFeedBack(
        address indexed _from,
        string added_string
    );
    
    struct idValidator{
        bool isRegistered;
        uint branchID;
        string name;
        
    }
    
    struct idCLient{
        bool isRegistered;
        string info_hash;
        string description;
    }
    
    struct idAuditor{
        bool isResgistered;
        uint auditorID;
        string entity;
    }
    
    mapping (address => idCLient) public clients;
    mapping (address => idAuditor) public auditors;
    mapping (address => idValidator) public validators;

    address public toVerify;
    address[] public registeredAddresses;

    
    string public contractName;
    function IMS(){
        contractName = "Identity Management Tool";
        validators[msg.sender] = idValidator(true, 8, "GenesisValidator");
        registeredAddresses.push(msg.sender);
    }
    
    
    function addClient(address input, string info_hash, string description) payable{        
        if( validators[msg.sender].isRegistered == true){
            if( clients[input].isRegistered ){
                feedBack(msg.sender, input, "Already registered");
                throw;
                }else{
                    registeredAddresses.push(input);
                    clients[input] = idCLient(true, info_hash, description);
                    feedBack(msg.sender, input, "Cleint was added");
                }
            }else{
               throw;
            }
    }

    function addValidator(address input, uint id, string name) payable{
        
        if( validators[msg.sender].isRegistered == true){
            if( clients[input].isRegistered ){
                feedBack(msg.sender, input, "Already registered");
                throw;
                }else{
                    registeredAddresses.push(input);
                    validators[input] = idValidator(true, id, name);
                    feedBack(msg.sender, input, "Validator was added");
                }
            }else{
               throw;
            }
    }

    function addAuditor(address input, uint id, string name) payable{
        
        if( validators[msg.sender].isRegistered == true){
            if( clients[input].isRegistered ){
                feedBack(msg.sender, input, "Already registered");
                throw;
                }else{
                    registeredAddresses.push(input);
                    auditors[input] = idAuditor(true, id, name);
                    feedBack(msg.sender, input, "Auditor was added");
                }
            }else{
               throw;
            }
    }

    function verifyAddress(address toVerify) returns (bool){
            if( clients[toVerify].isRegistered){
                return true;
            }
            
    }

    function compare(string _a, string _b) returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }

    function verifyClient(address toVerify, string hashed_info) returns(bool){
        if( clients[toVerify].isRegistered){
            if (compare(hashed_info, clients[toVerify].info_hash) == 0){
                return true;
            }
        }        
    }
    
    function changeClientData(address to_change, string new_hash ) payable{
        if( clients[toVerify].isRegistered){
            //Verify signature 
            clients[toVerify].info_hash;
        }
    }

    function verifySignature( address to_compare, bytes32 hash_msg, uint8 v, bytes32 r, bytes32 s) returns(bool){
        /*
        bytes32  r;
        bytes32  s;  
        bytes32 hash_b32;
        
        assembly{
            r:= mload(add(r_str, 32))
            s:= mload(add(s_str, 32))
            hash_b32:= mload(add(hash_str, 32))
        }
        
        address adr_sig = ecrecover(hash_b32, v,r,s);
        
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = sha3(prefix, hash_msg);
        */
        address addr_sig = ecrecover(hash_msg, v, r, s);
        return addr_sig == to_compare;
        //return (addr_to_verify == addr_sig);
    }

    
    function getRegAddrs() returns( address [] ){
        return registeredAddresses;
    }
}
