pragma solidity ^0.4.10;

contract IMS {
    
    struct idVerfifier{
        bool isRegistered;
        uint branchID;
        string name;
        
    }
    
    //
    struct idInformation{
        bool isRegistered;
        string fName;
        string lName;
        string addresse;
        bool isPEP;
        uint riskValue;
        uint signCounter;
    }
    
    //
    struct idAuditor{
        bool isResgistered;
        string name;
        string entity;
        string stillValid;
        uint[] cases;
    }
    
    //
    struct idAltInfo{
        bytes32 hash;
        bool isRegistered;
        uint16 riskValue;
    }
    
    // mappings
    mapping (address => idInformation) identifiers;
    mapping (address => idAuditor) auditors;
    mapping (address => idAltInfo) identifiers_v2;
    mapping (address => idVerfifier) verifiers;
    address toVerify;
    string contractName;
    //

    function IMS(){
        contractName = "Identity Management Tool";
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
    function verifyIdentity(address toVerify) returns (bool isIn){
            isIn = true;
            if( identifiers[toVerify].isRegistered) 
            {
                isIn = true;
            }else{
                isIn = false;
            }
    }
    
    function addIdentity(address input, string name_f, string name_l, string addr, bool is_pep){
        if( !verifiers[msg.sender].isRegistered){
            throw;
        }
        if( identifiers[input].isRegistered){
            throw;
        }else{
            uint16 riskValue;
            uint16 estimated_amount= 800;
            riskValue = estimateRisk(is_pep, false, estimated_amount);
    	    bytes32 id_hash = sha3( name_f, name_l,  addr, is_pep);
            identifiers[input] = idInformation(true, name_f, name_l,  addr, is_pep, riskValue, 0);
	        identifiers_v2[input] = idAltInfo(id_hash, true, riskValue);
	
        }
    }
}
