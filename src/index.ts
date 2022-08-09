import { EnvService } from './config/envService';
import { RabbitMqConnection } from './rabbit/rabbitConnection';
import { startServer } from './server';

const envService = new EnvService();
const rabbitConn = new RabbitMqConnection(envService);

try {
	startServer();
} catch (err) {
	console.log('Unhandled exception: ' + err);
}
