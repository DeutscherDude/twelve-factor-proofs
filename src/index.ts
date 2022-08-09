import { startServer } from './server';

try {
	startServer();
} catch (err) {
	console.log('Unhandled exception: ' + err);
}
