import { Injectable } from '../ioc';
import { SectorDto, SectorEntity } from '../model/sector-entity';

@Injectable()
export class SectorConverterService {
	public toDto(sector: SectorEntity): SectorDto {
		return sector;
	}

	public toDtoBulk(sectors: SectorEntity[]): SectorDto[] {
		return sectors;
	}

	public fromDtoBulk(dtos: SectorDto[]): SectorEntity[] {
		return dtos;
	}
}
