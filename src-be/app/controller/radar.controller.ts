import { RadarConfig } from 'app/model/radar-config';
import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Route
} from 'tsoa';
import { Inject } from '../ioc';
import { RadarEntity } from '../model/radar-entity';
import { RadarsService } from '../service/radars.service';

@Route('api/radars')
export class RadarsController extends Controller {
	@Inject() private radarsService!: RadarsService;

	@Get('')
	public async getAllLatestRadars(): Promise<RadarEntity[]> {
		return this.radarsService.getAllLatestRadars();
	}

	@Get('{radarId}')
	public async getRadar(@Path() radarId: string): Promise<RadarEntity[]> {
		return this.radarsService.getRadarsById(radarId);
	}

	@Post('{radarId}')
	public async updateRadar(@Path() radarId: string, @Body() config: RadarConfig): Promise<RadarEntity> {
		return this.radarsService.createRadar(config, radarId);
	}

	@Delete('{radarId}')
	public async deleteRadar(@Path() radarId: string): Promise<void> {
		return this.radarsService.deleteRadar(radarId);
	}
}
