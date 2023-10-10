const { Client } = require('pg');

const connectionData = {
  user: 'ucbdb8rnlirr23zkntjv',
  host: 'bl3ynszx9yl5gh4xtcxy-postgresql.services.clever-cloud.com',
  database: 'bl3ynszx9yl5gh4xtcxy',
  password: 'gQuNQt5nDbpAeS9WI35pjoxnAP3loM',
  port: 5432,
};
// function getConnection() {
// 	var connection = mysql.createConnection({
//         user: 'ucbdb8rnlirr23zkntjv',
//         host: 'bl3ynszx9yl5gh4xtcxy-postgresql.services.clever-cloud.com',
//         database: 'bl3ynszx9yl5gh4xtcxy',
//         password: 'gQuNQt5nDbpAeS9WI35pjoxnAP3loM',
//         port: 5432,
// 		timeout: Number(properties.get('mysql.timeout')) * 1000
// 	});
// 	return connection;
// }

// function Pool(connection_no) {
// 	this.pool = [];
// 	this.isAvailable = [];
// 	for (var i = 0; i < connection_no; i++) {
// 		this.pool.push(getConnection());
// 	}
// 	for (var j = 0; j < connection_no; j++) {
// 		this.isAvailable.push(true);
// 	}
// }

// Pool.prototype.get = function(useConnection) {
// 	var cli;
// 	var connectionNumber;
// 	for (var i = 0; i < this.pool.length; i++) {
// 		if (this.isAvailable[i]) {
// 			cli = this.pool[i];
// 			// Enable Connection Pooling
// 			this.isAvailable[i] = false;
// 			// Disable Connection Pooling
// 			//			this.isAvailable[i] = true;
// 			connectionNumber = i;
// 			break;
// 		}
// 		if (i === this.pool.length - 1) {
// 			i = 0;
// 		}
// 	}

// 	// Enable Connection Pooling
// 	useConnection(connectionNumber, cli);
// 	// Disable Connection Pooling
// 	//	useConnection(connectionNumber, getConnection());
// };

// Pool.prototype.release = function(connectionNumber, connection) {
// 	// Enable Connection Pooling
// 	this.isAvailable[connectionNumber] = true;
// 	// Disable Connection Pooling
// 	//	connection.end();
// };

// function initializeConnectionPool() {
// 	var p = new Pool(properties.get('mysql.poolSize'));
// 	return p;
// }

// console.log('Initializing pool with ' + properties.get('mysql.poolSize') + ' connections');
// var connectionPool = initializeConnectionPool();

const client = new Client(connectionData);

// Exportamos el cliente para que esté disponible en otros módulos.
module.exports = client;
