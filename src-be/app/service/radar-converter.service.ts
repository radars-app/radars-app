import { Injectable } from '../ioc';
import { RadarDataItemDto } from '../model/radar-data-item-entity';
import { RadarDto, RadarEntity } from '../model/radar-entity';
import { RingDto } from '../model/ring-entity';
import { SectorDto } from '../model/sector-entity';

@Injectable()
export class RadarConverterService {
	public fromDto(dto: RadarDto): RadarEntity {
		return {
			uid: dto.uid,
			name: dto.name,
			ringIds: dto.rings.map((ring: RingDto) => ring.uid),
			sectorIds: dto.sectors.map((sector: SectorDto) => sector.uid),
			sharepointListUrl: dto.sharepointListUrl,
			lastUpdatedAt: dto.lastUpdatedAt,
			nameColumn: dto.nameColumn,
			contentColumn: dto.contentColumn,
			linkColumn: dto.linkColumn,
			sectorColumn: dto.sectorColumn,
			ringColumn: dto.ringColumn,
			consideredNewInDays: dto.consideredNewInDays,
			filterColumnEnabled: dto.filterColumnEnabled,
			filterColumnKeywords: dto.filterColumnKeywords,
			filterColumnName: dto.filterColumnName,
		};
	}

	public toDto(radar: RadarEntity, ringsDto: RingDto[], sectorsDto: SectorDto[], itemsDto: RadarDataItemDto[]): RadarDto {
		const dto: RadarDto = {
			uid: radar.uid,
			name: radar.name,
			rings: ringsDto,
			sectors: sectorsDto,
			sharepointListUrl: radar.sharepointListUrl,
			lastUpdatedAt: radar.lastUpdatedAt,
			nameColumn: radar.nameColumn,
			contentColumn: radar.contentColumn,
			linkColumn: radar.linkColumn,
			sectorColumn: radar.sectorColumn,
			ringColumn: radar.ringColumn,
			consideredNewInDays: radar.consideredNewInDays,
			filterColumnEnabled: radar.filterColumnEnabled,
			filterColumnName: radar.filterColumnName,
			filterColumnKeywords: radar.filterColumnKeywords,
			items: itemsDto,
		};

		return dto;
	}

	public toDtoBulk(radars: RadarEntity[], ringsDto: RingDto[], sectorsDto: SectorDto[], itemsDto: RadarDataItemDto[]): RadarDto[] {
		const dtoList: RadarDto[] = radars.map((radar: RadarEntity) => {
			const rings: RingDto[] = radar.ringIds.map((id: string) => {
				return ringsDto.find((ringDto: RingDto) => ringDto.uid === id);
			}) as RingDto[];

			const sectors: SectorDto[] = radar.sectorIds.map((id: string) => {
				return sectorsDto.find((sectorDto: SectorDto) => sectorDto.uid === id);
			}) as SectorDto[];

			const items: RadarDataItemDto[] = itemsDto.filter((itemDto: RadarDataItemDto) => itemDto.radarId === radar.uid);

			const dto: RadarDto = this.toDto(radar, rings, sectors, items);
			return dto;
		});

		return dtoList;
	}
}
