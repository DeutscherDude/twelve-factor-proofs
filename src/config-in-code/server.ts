import express from 'express';
import { RabbitMqConnection } from './rabbit/rabbitConnection';

const startServer = async (rabbitConnection: RabbitMqConnection) => {
	const app = express();
	const port = 3000;

	app.listen(port, () => {
		console.log(`Server running at port ${port}`);
	});
};

export { startServer };
