import express from 'express';
import { EnvService } from './config/envService';
import { RabbitMqConnection } from './rabbit/rabbitConnection';

const startServer = async (rabbitConnection: RabbitMqConnection, envService: EnvService) => {
	const app = express();
	const port = await envService.getServerPort();

	app.listen(port, () => {
		console.log(`Server running at port ${port}`);
	});
};

export { startServer };
