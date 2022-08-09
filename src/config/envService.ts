import * as dotenv from 'dotenv';

export class EnvService {
	private readonly env: dotenv.DotenvConfigOutput;

	constructor() {
		this.env = dotenv.config();
	}

	async getRabbitMqUri() {
		if (this.env?.parsed?.RABBIT_MQ_CONNECTION === undefined)
			throw new Error('RabbitMQ URI not set!');
		return this.env.parsed.RABBIT_MQ_CONNECTION;
	}
}
