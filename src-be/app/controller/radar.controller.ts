import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Inject } from '../ioc';
import { RadarDto } from '../model/radar-entity';
import { RadarsService } from '../service/radars.service';

@Route('api/radars')
export class RadarsController extends Controller {
	@Inject() private radarsService!: RadarsService;

	@Get('')
	public async getAllLatestRadars(@Query('date') date: string): Promise<RadarDto[]> {
		return this.radarsService.getAllRadars(new Date(date));
	}

	@Get('{radarId}')
	public async getRadar(@Path() radarId: string, @Query('date') date: string): Promise<RadarDto> {
		return this.radarsService.getRadarById(radarId, new Date(date));
	}

	@Post('')
	@Security('admin-access')
	public async createRadar(@Body() dto: RadarDto): Promise<RadarDto> {
		return this.radarsService.createRadar(dto);
	}

	@Put('{radarId}')
	@Security('admin-access')
	public async updateRadar(@Body() dto: RadarDto): Promise<RadarDto> {
		return this.radarsService.updateRadar(dto);
	}

	@Delete('{radarId}')
	@Security('admin-access')
	public async deleteRadar(@Path() radarId: string): Promise<void> {
		return this.radarsService.removeRadar(radarId);
	}
}
