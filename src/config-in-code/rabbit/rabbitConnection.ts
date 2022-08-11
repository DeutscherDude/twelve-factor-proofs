import client, { Connection } from 'amqplib';

export class RabbitMqConnection {
	connection: null | Connection = null;
	constructor() {
		if (this.connection !== null) {
			throw new Error('RabbitMqConnection is a singleton that already exists!');
		}
		this.createConnection();
	}
	async createConnection(): Promise<Connection> {
		const uri = 'amqp://testing:test@rabbit:6666';
		this.connection = await client.connect(uri);
		return this.connection!;
	}
}
