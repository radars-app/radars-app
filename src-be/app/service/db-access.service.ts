import { Injectable } from '../ioc';
import config from '../../auth-config.json';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class DbAccessService {
	private mongoClient: MongoClient;

	public get client(): MongoClient {
		return this.mongoClient;
	}

	public get radarsDb(): Promise<Db> {
		if (this.mongoClient.isConnected()) {
			return Promise.resolve(this.mongoClient.db('radars-db'));
		} else {
			return this.mongoClient.connect().then((client: MongoClient) => {
				this.mongoClient = client;
				return client.db('radars-db');
			});
		}
	}

	constructor() {
		this.mongoClient = new MongoClient(
			`mongodb+srv://${config.mongo.username}:${config.mongo.password}@realmcluster.oprpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
	}
}
