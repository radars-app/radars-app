import express, { Response } from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from '../tsoa-build/routes';
import swaggerUi from 'swagger-ui-express';
import { setupAuthenticationMiddleware } from './authentication';
import { serveAngular } from './serve-angular';

export const app: any = express();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());

setupAuthenticationMiddleware(app);

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, async (_: any, response: Response) => {
		return response.send(
				swaggerUi.generateHTML(await import('../tsoa-build/swagger.json'))
		);
});

serveAngular(app);
