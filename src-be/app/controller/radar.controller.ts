import {
	Body,
	Controller,
	Get,
	Path,
	Put,
	Route
} from 'tsoa';
import { Inject } from '../ioc';
import { RadarEntity } from '../model/radar-entity';
import { RadarsService } from '../service/radars.service';

@Route('radars')

export class RadarsController extends Controller {
	@Inject() private radarsService!: RadarsService;

	@Get('{entityId}')
	public async getRadar(@Path() entityId: string): Promise<RadarEntity> {
		return this.radarsService.getRadarById(entityId);
	}

	@Put('{entityId}')
	public async updateRadar(@Path() entityId: string, @Body() radar: RadarEntity): Promise<RadarEntity> {
		return this.radarsService.updateRadarById(entityId, radar);
	}
}
