pragma solidity ^0.4.6;

contract IMS {
    
    event feedBack(
        address indexed sender,
        address indexed data,
        string info
    );
    event auditFeedback(
        address indexed sender,
        address indexed data,
        string info
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
        bool isRegistered;
        uint auditorID;
        string entity;
        address current_audit;
    }
    
    mapping (address => idCLient) public clients;
    mapping (address => idAuditor) public auditors;
    mapping (address => idValidator) public validators;
    
    address public to_verify;
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
            if( validators[input].isRegistered ){
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
            if( auditors[input].isRegistered ){
                feedBack(msg.sender, input, "Already registered");
                //throw;
                }else{
                    registeredAddresses.push(input);
                    auditors[input] = idAuditor(true, id, name, msg.sender);
                    feedBack(msg.sender, input, "Auditor was added");
                }
            }else{
               //throw;
            }
    }

    function verifyAddress(address to_verify) returns (bool){
            if( clients[to_verify].isRegistered){
                return true;
            }
            
    }

    function compare(string _a, string _b) returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
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

    function verifyClient(address to_verify, string hashed_info) returns(bool){
        if( clients[to_verify].isRegistered){
            if (compare(hashed_info, clients[to_verify].info_hash) == 0){
                return true;
            }
        }        
    }
    
    function changeClientData(address to_change, string new_hash) payable{
        //address addr_sig = ecrecover(hash_msg, v, r, s);
       /*
        if( clients[to_change].isRegistered){
            if(validators[msg.sender].isRegistered){
                if(addr_sig == to_change){
                    clients[to_verify].info_hash = new_hash;
                }else
                    throw;
            }
        } else if (msg.sender == to_change){
            if(validators[addr_sig].isRegistered){
                clients[to_verify].info_hash=new_hash;
            }else 
                throw;
        }else 
            throw;
        */
        if( clients[to_change].isRegistered){
            if(validators[msg.sender].isRegistered){
                    clients[to_change].info_hash = new_hash;
                    feedBack(msg.sender, to_change, new_hash);
            }else {
                throw;}
                
        }else {
            throw;
        }
            
    }

    function verifySignature( bytes32 hash_msg, uint8 v, bytes32 r, bytes32 s) returns(address){
        address addr_sig = ecrecover(hash_msg, v, r, s);
        return addr_sig;// == to_compare;
        //return (addr_to_verify == addr_sig);
    }

    function verifySignatureAddr(address t_compare, bytes32 hash_msg, uint8 v, bytes32 r, bytes32 s) returns(bool){
        address addr_sig = ecrecover(hash_msg, v, r, s);
        return t_compare == addr_sig;
    }
    function verifySignatureStr( address to_compare, string hash_str, uint8 v, string r_str, string s_str) returns(bool){
        
        bytes32  r;
        bytes32  s;  
        bytes32 hash_b32;
        
        assembly{
            r:= mload(add(r_str, 32))
            s:= mload(add(s_str, 32))
            hash_b32:= mload(add(hash_str, 32))
        }
               
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = sha3(prefix, hash_b32);
        
        address addr_sig = ecrecover(prefixedHash, v, r, s);
        return addr_sig == to_compare;
        
    }

    function addInvestigation(address to_investigate) payable{
        if(auditors[msg.sender].isRegistered && clients[to_investigate].isRegistered){
            auditors[msg.sender].current_audit = to_investigate;
            auditFeedback(msg.sender, to_investigate, "Added investigation" );
        }else 
            auditFeedback(msg.sender, to_investigate, "not registered");
    }

    function endInvestigation(address to_delete) payable{
        if(auditors[msg.sender].isRegistered && (msg.sender ==to_delete)){
            auditors[msg.sender].current_audit = msg.sender;
            auditFeedback(msg.sender, to_delete, "Deleted request" );
        }else
            auditFeedback(msg.sender, to_delete, "Not goOD" );
    }

    function getInvestigatedAdr(address aud_adr) returns(address){
        return auditors[aud_adr].current_audit;
    }
    function getRegAddrs() returns( address [] ){
        return registeredAddresses;
    }
}