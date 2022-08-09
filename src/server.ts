import express from 'express';

const startServer = () => {
	const app = express();

	app.listen(3000, () => {
		console.log('Server running at port 3000');
	});
};

export { startServer };
