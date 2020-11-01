import { Injectable } from '../ioc';
import { SampleEntity } from '../model/sample-entity';

@Injectable()
export class SampleService {
	public async getSampleEntity(id: string): Promise<SampleEntity> {
		return Promise.resolve({
			name: id + 'atata'
		});
	}
}
