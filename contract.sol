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
    string public registeredString;

    
    string public contractName;
    function IMS(){
        contractName = "Identity Management Tool";
        validators[msg.sender] = idValidator(true, 8, "GenesisValidator");
        registeredAddresses.push(msg.sender);
    }
    
    
    function addClient(address input, string info_hash, string description) payable{
        
        if( validators[msg.sender].isRegistered == true){
            if( clients[input].isRegistered ){
                feedBack(msg.sender, input, "NOT OK");
                throw;
                }else{
                    registeredAddresses.push(input);
                    clients[input] = idCLient(true, info_hash, description);
                    feedBack(msg.sender, input, "OK");
                }
            }else{
               throw;
            }
    }

    function verifyAddress(address toVerify) returns (bool){
            if( clients[toVerify].isRegistered) 
            {
                return true;
            }else{
                return false;
            }
    }

    function changeArray( string adr){
        registeredString = adr;
        stringsFeedBack(msg.sender, adr);
    }

    function getRegAddrs() returns( address [] ){
        return registeredAddresses;
    }
}
