import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const pathToDist: string = '../src-fe/dist/';

export function serveAngular(app: express.Router): void {
	app.use(function(request: Request, response: Response, next: Function): void {
		const accept: string | boolean = request.accepts('html', 'json', 'xml');
		if (accept !== 'html') {
			return next();
		}

		const extesionName: string = path.extname(request.path);
		if (Boolean(extesionName)) {
			return next();
		}

		fs.createReadStream(pathToDist + 'index.html').pipe(response);
	});

	app.use(express.static(pathToDist));
}
