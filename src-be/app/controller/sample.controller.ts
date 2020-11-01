import {
	Controller,
	Get,
	Path,
	Route
} from 'tsoa';
import { Inject } from '../ioc';
import { SampleEntity } from '../model/sample-entity';
import { SampleService } from '../service/sample.service';

@Route('sample')

export class SampleController extends Controller {
	@Inject() private sampleService!: SampleService;

	@Get('{entityId}')
	public async getUser(@Path() entityId: string): Promise<SampleEntity> {
		return this.sampleService.getSampleEntity(entityId);
	}
}
