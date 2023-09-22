import { app } from './fastify';

const port: number = Number(process.env.PORT) || 3000;

app.listen({ port }, function (err) {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`Server is running on port ${port}`);
});
