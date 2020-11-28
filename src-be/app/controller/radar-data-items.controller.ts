import { RadarDataItemEntity } from '../model/radar-data-item-entity';
import { RadarDataItemService } from '../service/radar-data-item.service';
import {
	Controller,
	Get,
	Path,
	Route
} from 'tsoa';
import { Inject } from '../ioc';

@Route('api/radar-data-items')
export class RadarDataItemsController extends Controller {
	@Inject() private radarDataItemsService!: RadarDataItemService;

	@Get('{radarId}')
	public async getRadar(@Path() radarId: string): Promise<RadarDataItemEntity[]> {
		return this.radarDataItemsService.getDataItemsSetByRadarId(radarId);
	}
}
