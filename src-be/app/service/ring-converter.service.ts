import { Injectable } from '../ioc';
import { RingDto, RingEntity } from '../model/ring-entity';

@Injectable()
export class RingConverterService {
	public toDto(ring: RingEntity): RingDto {
		return ring;
	}

	public toDtoBulk(rings: RingEntity[]): RingDto[] {
		return rings;
	}

	public fromDtoBulk(dtos: RingDto[]): RingEntity[] {
		return dtos;
	}
}
