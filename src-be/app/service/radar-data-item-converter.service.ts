import { Injectable } from '../ioc';
import { RadarDataItemStatus } from '../model/radar-data-item-status';
import { RadarDataItemDto, RadarDataItemEntity, RadarDataItemEntityWithStatus } from '../model/radar-data-item-entity';
import { RingDto } from '../model/ring-entity';
import { SectorDto } from '../model/sector-entity';

@Injectable()
export class RadarDataItemConverterService {
	public fromDto(dto: RadarDataItemDto): RadarDataItemEntity {
		const item: RadarDataItemEntity = {
			radarId: dto.radarId,
			ringId: dto.ring.uid,
			sectorId: dto.sector.uid,
			name: dto.name,
			content: dto.content,
			link: dto.link,
			updatedAt: dto.updatedAt,
		};

		return item;
	}

	public toDto(item: RadarDataItemEntity | RadarDataItemEntityWithStatus, ringDto: RingDto, sectorDto: SectorDto): RadarDataItemDto {
		const dto: RadarDataItemDto = {
			radarId: item.radarId,
			ring: ringDto,
			sector: sectorDto,
			name: item.name,
			content: item.content,
			link: item.link,
			updatedAt: item.updatedAt,
			status: RadarDataItemStatus.NoChanges,
		};

		const itemWithStatus: RadarDataItemEntityWithStatus = item as RadarDataItemEntityWithStatus;
		if (Boolean(itemWithStatus.status)) {
			dto.status = itemWithStatus.status;
		}

		return dto;
	}

	public toDtoBulk(items: RadarDataItemEntity[], rings: RingDto[], sectors: SectorDto[]): RadarDataItemDto[] {
		const dtoList: RadarDataItemDto[] = items.map((item: RadarDataItemEntity) => {
			const ringDto: RingDto = rings.find((ring: RingDto) => item.ringId === ring.uid) as RingDto;
			const sectorDto: SectorDto = sectors.find((sector: SectorDto) => item.sectorId === sector.uid) as SectorDto;
			const dto: RadarDataItemDto = this.toDto(item, ringDto, sectorDto);
			return dto;
		});

		return dtoList;
	}
}
