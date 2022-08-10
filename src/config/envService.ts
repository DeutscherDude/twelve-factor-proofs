import * as dotenv from 'dotenv';
import * as path from 'path';

export class EnvService {
	private readonly env: dotenv.DotenvConfigOutput;

	constructor() {
		this.env = dotenv.config({ path: path.resolve(__dirname + '../../../app.env') });
	}

	async getRabbitMqUri() {
		if (this.env?.parsed?.RABBITMQ_URI === undefined)
			throw new Error('RabbitMQ URI not set!');
		return this.env.parsed.RABBITMQ_URI;
	}

	async getServerPort() {
		if (this.env?.parsed?.NODE_SERVER_PORT === undefined)
			throw new Error('Node Server port is not set!');
		const port = parseInt(this.env.parsed.NODE_SERVER_PORT);
		if (isNaN(port))
			throw new Error('NODE_SERVER_PORT MUST BE A NUMERIC STRING!');
		return port;
	}
}
