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
    struct idVerfifier{
        bool isRegistered;
        uint branchID;
        string name;
        
    }
    
    struct idInformation{
        bool isRegistered;
        string fName;
        string lName;
        string addresse;
        bool isPEP;
        uint riskValue;
        uint signCounter;
    }
    
    struct idAuditor{
        bool isResgistered;
        string name;
        string entity;
        string stillValid;
        uint[] cases;
    }
    
    struct idAltInfo{
        bytes32 hash;
        bool isRegistered;
        uint16 riskValue;
    }
    
    mapping (address => idInformation) public identifiers;
    mapping (address => idAuditor) public auditors;
    mapping (address => idAltInfo) public identifiers_v2;
    mapping (address => idVerfifier) public verifiers;
    address public toVerify;
    string contractName;
    address[] public registeredAddresses;
    string public registeredString;

    function IMS(){
        contractName = "Identity Management Tool";
        verifiers[msg.sender] = idVerfifier(true, 8, "ING:Longchamps");
        registeredAddresses.push(msg.sender);
    }
    
    function estimateRisk(bool isPEP, bool other, uint16 amount) returns (uint16 risk){
        risk = 0;
            
            if(isPEP){
                    risk =+ 10;
                }
            if(other){
                    risk =+ 5;
                }
            if(amount > 1000){
                    risk =+2;
                }
        
        }
    function verifyIdentity(address toVerify) returns (bool){
            if( identifiers[toVerify].isRegistered) 
            {
                return true;
            }else{
                return false;
            }
    }

    function addIdentity(address input, string name_f, string name_l, string addr, bool is_pep) payable{
        
        if( verifiers[msg.sender].isRegistered == true){
            if( identifiers[input].isRegistered ){
                feedBack(msg.sender, input, "NOT OK");
                throw;
                }else{
                    registeredAddresses.push(input);
                    uint16 riskValue;
                    uint16 estimated_amount= 800;
                    riskValue = estimateRisk(is_pep, false, estimated_amount);
                    bytes32 id_hash = sha3( name_f, name_l,  addr, is_pep);
                    identifiers[input] = idInformation(true, name_f, name_l,  addr, is_pep, riskValue, 0);
                    identifiers_v2[input] = idAltInfo(id_hash, true, riskValue);
                    feedBack(msg.sender, input, "OK");
                }
            }else{
               throw;
            }
    }

    function changeArray( string adr){
        registeredString = adr;
        stringsFeedBack(msg.sender, adr);
    }

    function getAddresses() returns( address [] ){
        return registeredAddresses;
    }
}
