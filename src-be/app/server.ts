import { app } from './app';
import process from 'process';

const defaultPort: string = '4200';

// tslint:disable-next-line: strict-boolean-expressions
const port: string = process.env.PORT || defaultPort;

app.listen(port, () =>
	console.log(`App listening at http://localhost:${port}`)
);
