abiContract = '[{"constant":false,"inputs":[{"name":"input","type":"address"},{"name":"id","type":"uint256"},{"name":"name","type":"string"}],"name":"addValidator","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"toVerify","type":"address"},{"name":"hashed_info","type":"string"}],"name":"verifyClient","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"toVerify","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_a","type":"string"},{"name":"_b","type":"string"}],"name":"compare","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"auditors","outputs":[{"name":"isResgistered","type":"bool"},{"name":"auditorID","type":"uint256"},{"name":"entity","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"clients","outputs":[{"name":"isRegistered","type":"bool"},{"name":"info_hash","type":"string"},{"name":"description","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"registeredAddresses","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"input","type":"address"},{"name":"id","type":"uint256"},{"name":"name","type":"string"}],"name":"addAuditor","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"input","type":"address"},{"name":"info_hash","type":"string"},{"name":"description","type":"string"}],"name":"addClient","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"getRegAddrs","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"validators","outputs":[{"name":"isRegistered","type":"bool"},{"name":"branchID","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"toVerify","type":"address"}],"name":"verifyAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"data","type":"address"},{"indexed":false,"name":"out","type":"string"}],"name":"feedBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"added_string","type":"string"}],"name":"stringsFeedBack","type":"event"}]';
