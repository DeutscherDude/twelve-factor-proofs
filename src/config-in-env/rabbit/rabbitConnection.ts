import client, { Channel, Connection } from 'amqplib';
import { EnvService } from '../config/envService';

export class RabbitMqConnection {
	connection: null | Connection = null;
	constructor(private readonly envService: EnvService) {
		if (this.connection !== null) {
			throw new Error('RabbitMqConnection is a singleton that already exists!');
		}
		this.createConnection();
	}
	async createConnection(): Promise<Connection> {
		const uri = await this.envService.getRabbitMqUri();
		const temp = 'amqp://testing:test@rabbit:6666';
		this.connection = await client.connect(temp);
		return this.connection!;
	}
}
