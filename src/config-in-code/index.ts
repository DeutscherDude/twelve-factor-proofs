import { RabbitMqConnection } from './rabbit/rabbitConnection';
import { startServer } from './server';

const rabbitConn = new RabbitMqConnection();

try {
	startServer(rabbitConn);
} catch (err) {
	console.log('Unhandled exception: ' + err);
}
