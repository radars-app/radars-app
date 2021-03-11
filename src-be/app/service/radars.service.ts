import { RadarDataItemDto, RadarDataItemEntity, RadarDataItemEntityWithStatus } from '../model/radar-data-item-entity';
import { Inject, Injectable } from '../ioc';
import { RadarDto, RadarEntity } from '../model/radar-entity';
import { CsvParserService } from './csv-parser.service';
import { RadarRepositoryService } from './radar-repository.service';
import { RadarConverterService } from './radar-converter.service';
import { RadarDataItemRepositoryService } from './radar-data-item-repository.service';
import { SectorDto, SectorEntity } from '../model/sector-entity';
import { SectorRepositoryService } from './sector-repository.service';
import { RadarDataItemConverterService } from './radar-data-item-converter.service';
import { RingRepositoryService } from './ring-repository.service';
import { RingDto, RingEntity } from '../model/ring-entity';
import { SectorConverterService } from './sector-converter.service';
import { RingConverterService } from './ring-converter.service';
import { RadarDataItemCalculatorService } from './radar-data-items-calculator.service';
import { CsvRadarDataItemRecord } from '../model/csv-radar-data-item-record';
import { CsvRecordsConverterService } from './csv-records-converter.service';

@Injectable()
export class RadarsService {
	@Inject() csvParser!: CsvParserService;
	@Inject() radarRepository!: RadarRepositoryService;
	@Inject() radarConverter!: RadarConverterService;
	@Inject() radarDataItemRepository!: RadarDataItemRepositoryService;
	@Inject() sectorRepository!: SectorRepositoryService;
	@Inject() radarDataItemConverter!: RadarDataItemConverterService;
	@Inject() sectorConverter!: SectorConverterService;
	@Inject() ringRepository!: RingRepositoryService;
	@Inject() ringConverter!: RingConverterService;
	@Inject() radarDataItemCalculator!: RadarDataItemCalculatorService;
	@Inject() csvRecordsConverterService!: CsvRecordsConverterService;

	public async getAllRadars(date: Date): Promise<RadarDto[]> {
		const radars: RadarEntity[] = await this.radarRepository.getAllRadars();
		const radarsId: string[] = radars.map((radar: RadarEntity) => radar.uid);

		const sectorsId: string[] = radars.reduce((ids: string[], radar: RadarEntity) => [...ids, ...radar.sectorIds], []);
		const sectors: SectorEntity[] = await this.sectorRepository.getSectorsByIds(sectorsId);
		const sectorsDto: SectorDto[] = this.sectorConverter.toDtoBulk(sectors);

		const ringsId: string[] = radars.reduce((ids: string[], radar: RadarEntity) => [...ids, ...radar.ringIds], []);
		const rings: RingEntity[] = await this.ringRepository.getRingsByIds(ringsId);
		const ringsDto: RingDto[] = this.ringConverter.toDtoBulk(rings);

		const items: RadarDataItemEntity[] = await this.radarDataItemRepository.getRadarDataItemsByRadarsId(radarsId);
		const latestItems: RadarDataItemEntity[] = this.radarDataItemCalculator.getLatestRadarItemsByRadarsId(radarsId, items, date);
		const itemsDto: RadarDataItemDto[] = this.radarDataItemConverter.toDtoBulk(latestItems, ringsDto, sectorsDto);

		const radarsDto: RadarDto[] = this.radarConverter.toDtoBulk(radars, ringsDto, sectorsDto, itemsDto);

		return Promise.resolve(radarsDto);
	}

	public async getRadarById(radarId: string, selectedDate: Date): Promise<RadarDto> {
		const radar: RadarEntity = await this.radarRepository.getRadarById(radarId);

		const sectors: SectorEntity[] = await this.sectorRepository.getSectorsByIds(radar.sectorIds);
		const sectorsDto: SectorDto[] = this.sectorConverter.toDtoBulk(sectors);

		const rings: RingEntity[] = await this.ringRepository.getRingsByIds(radar.ringIds);
		const ringsDto: RingDto[] = this.ringConverter.toDtoBulk(rings);

		const items: RadarDataItemEntity[] = await this.radarDataItemRepository.getRadarDataItemsByRadarId(radarId);
		const calculatedItems: RadarDataItemEntityWithStatus[] = this.radarDataItemCalculator.calculateStatusForItems(
			items,
			radar.consideredNewInDays,
			selectedDate
		);

		const itemsDto: RadarDataItemDto[] = this.radarDataItemConverter.toDtoBulk(calculatedItems, rings, sectors);
		const radarDto: RadarDto = this.radarConverter.toDto(radar, ringsDto, sectorsDto, itemsDto);

		return radarDto;
	}

	public async createRadar(dto: RadarDto): Promise<RadarDto> {
		const rings: RingEntity[] = this.ringConverter.fromDtoBulk(dto.rings);
		if (rings.length) {
			await this.ringRepository.addRingsBulk(rings);
		}

		const sectors: SectorEntity[] = this.sectorConverter.fromDtoBulk(dto.sectors);
		if (sectors.length) {
			await this.sectorRepository.addSectorsBulk(sectors);
		}

		if (Boolean(dto.csv)) {
			const itemRecords: CsvRadarDataItemRecord[] = this.csvParser.parseCustomDataScheme(dto.csv as string, dto);
			const items: RadarDataItemEntity[] = this.csvRecordsConverterService.toRadarDataItemEntityBulk(
				itemRecords,
				rings,
				sectors,
				dto.uid,
				dto.filterColumnEnabled,
				dto.filterColumnKeywords
			);
			await this.radarDataItemRepository.addRadarDataItems(items);
		}

		const radar: RadarEntity = this.radarConverter.fromDto(dto);
		await this.radarRepository.createRadar(radar);

		return this.getRadarById(radar.uid, new Date());
	}

	public async updateRadar(dto: RadarDto): Promise<RadarDto> {
		const oldRadar: RadarDto = await this.getRadarById(dto.uid, new Date());

		const sectorsDtoToUpdate: SectorDto[] = dto.sectors.filter((sector: SectorDto) => {
			return oldRadar.sectors.find((oldSector: SectorDto) => sector.uid === oldSector.uid);
		});

		const sectorsToUpdate: SectorEntity[] = this.sectorConverter.fromDtoBulk(sectorsDtoToUpdate);
		if (Boolean(sectorsToUpdate.length)) {
			await this.sectorRepository.updateSectorsBulk(sectorsToUpdate);
		}

		const sectorsDtoToRemove: SectorDto[] = oldRadar.sectors.filter((oldSector: SectorDto) => {
			return !dto.sectors.find((sector: SectorDto) => sector.uid === oldSector.uid);
		});

		const sectorsIdToRemove: string[] = sectorsDtoToRemove.map((sector: SectorDto) => sector.uid);
		if (Boolean(sectorsIdToRemove.length)) {
			await this.sectorRepository.removeSectorsBulk(sectorsIdToRemove);
		}

		const sectorsDtoToAdd: SectorDto[] = dto.sectors.filter((sector: SectorDto) => {
			return !oldRadar.sectors.find((oldSector: SectorDto) => sector.uid === oldSector.uid);
		});

		const sectorsToAdd: SectorEntity[] = this.sectorConverter.fromDtoBulk(sectorsDtoToAdd);
		if (Boolean(sectorsToAdd.length)) {
			await this.sectorRepository.addSectorsBulk(sectorsToAdd);
		}

		const ringsDtoToUpdate: RingDto[] = dto.rings.filter((ring: RingDto) => {
			return oldRadar.rings.find((oldRing: RingDto) => ring.uid === oldRing.uid);
		});

		const ringsToUpdate: RingEntity[] = this.ringConverter.fromDtoBulk(ringsDtoToUpdate);
		if (Boolean(ringsToUpdate.length)) {
			await this.ringRepository.updateRingsBulk(ringsToUpdate);
		}

		const ringsDtoToRemove: RingDto[] = oldRadar.rings.filter((oldRing: RingDto) => {
			return !dto.rings.find((ring: RingDto) => ring.uid === oldRing.uid);
		});

		const ringsIdToRemove: string[] = ringsDtoToRemove.map((ring: RingDto) => ring.uid);
		if (Boolean(ringsIdToRemove.length)) {
			await this.ringRepository.removeRingsBulk(ringsIdToRemove);
		}

		const ringsDtoToAdd: RingDto[] = dto.rings.filter((ring: RingDto) => {
			return !oldRadar.rings.find((oldRing: RingDto) => ring.uid === oldRing.uid);
		});

		const ringsToAdd: RingEntity[] = this.ringConverter.fromDtoBulk(ringsDtoToAdd);
		if (Boolean(ringsToAdd.length)) {
			await this.ringRepository.addRingsBulk(ringsToAdd);
		}

		if (
			Boolean(ringsToAdd.length) ||
			Boolean(ringsIdToRemove.length) ||
			Boolean(sectorsToAdd.length) ||
			Boolean(sectorsIdToRemove.length)
		) {
			console.log('Radar History Clean Up', dto.uid);
			await this.radarDataItemRepository.removeRadarDataItemsByRadarId(dto.uid);
		}

		if (Boolean(dto.csv)) {
			const itemRecords: CsvRadarDataItemRecord[] = this.csvParser.parseCustomDataScheme(dto.csv as string, dto);
			const rings: RingEntity[] = this.ringConverter.fromDtoBulk(dto.rings);
			const sectors: SectorEntity[] = this.sectorConverter.fromDtoBulk(dto.sectors);
			const items: RadarDataItemEntity[] = this.csvRecordsConverterService.toRadarDataItemEntityBulk(
				itemRecords,
				rings,
				sectors,
				dto.uid,
				dto.filterColumnEnabled,
				dto.filterColumnKeywords
			);

			if (Boolean(items.length)) {
				await this.radarDataItemRepository.addRadarDataItems(items);
			}

			const itemsDtoToRemove: RadarDataItemDto[] = oldRadar.items.filter((oldItem: RadarDataItemDto) => {
				return !items.find((item: RadarDataItemEntity) => item.name === oldItem.name);
			});

			const itemsToRemove: RadarDataItemEntity[] = itemsDtoToRemove.map((itemDto: RadarDataItemDto) => {
				const item: RadarDataItemEntity = this.radarDataItemConverter.fromDto(itemDto);
				item.content = '';
				item.updatedAt = new Date().toUTCString();

				return item;
			});

			if (Boolean(itemsToRemove.length)) {
				await this.radarDataItemRepository.addRadarDataItems(itemsToRemove);
			}
		}

		const newRadar: RadarEntity = this.radarConverter.fromDto(dto);
		await this.radarRepository.updateRadar(newRadar);

		return this.getRadarById(dto.uid, new Date());
	}

	public async removeRadar(radarId: string): Promise<void> {
		const radar: RadarEntity = await this.radarRepository.getRadarById(radarId);
		await this.radarRepository.removeRadar(radarId);
		await this.sectorRepository.removeSectorsBulk(radar.sectorIds);
		await this.ringRepository.removeRingsBulk(radar.ringIds);
		return this.radarDataItemRepository.removeRadarDataItemsByRadarId(radarId).then();
	}
}
