abiContract = '[{"constant":false,"inputs":[{"name":"input","type":"address"},{"name":"id","type":"uint256"},{"name":"name","type":"string"}],"name":"addValidator","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"to_investigate","type":"address"}],"name":"addInvestigation","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"to_verify","type":"address"},{"name":"hashed_info","type":"string"}],"name":"verifyClient","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_a","type":"string"},{"name":"_b","type":"string"}],"name":"compare","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"auditors","outputs":[{"name":"isRegistered","type":"bool"},{"name":"auditorID","type":"uint256"},{"name":"entity","type":"string"},{"name":"current_audit","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to_change","type":"address"},{"name":"new_hash","type":"string"}],"name":"changeClientData","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"clients","outputs":[{"name":"isRegistered","type":"bool"},{"name":"info_hash","type":"string"},{"name":"description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"t_compare","type":"address"},{"name":"hash_msg","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verifySignatureAddr","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"registeredAddresses","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"aud_adr","type":"address"}],"name":"getInvestigatedAdr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"input","type":"address"},{"name":"id","type":"uint256"},{"name":"name","type":"string"}],"name":"addAuditor","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"failSugnature","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash_msg","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verifySignature","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"input","type":"address"},{"name":"info_hash","type":"string"},{"name":"description","type":"string"}],"name":"addClient","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"to_verify","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to_delete","type":"address"}],"name":"endInvestigation","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"getRegAddrs","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"validators","outputs":[{"name":"isRegistered","type":"bool"},{"name":"branchID","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to_verify","type":"address"}],"name":"verifyAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to_compare","type":"address"},{"name":"hash_str","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verifySignatureStr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"client","type":"address"},{"indexed":false,"name":"information","type":"string"}],"name":"feedBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"data","type":"address"},{"indexed":false,"name":"info","type":"string"}],"name":"auditFeedback","type":"event"}]';
