import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { IconService } from '../../../common-components/icon/service/icon.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { EditDialogComponent } from './edit-dialog.component';

describe('EditDialogComponent', () => {
	const radarName: string = 'Radar1';

	let component: EditDialogComponent;
	let fixture: ComponentFixture<EditDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EditDialogComponent],
			imports: [CommonComponentsModule, HttpClientModule],
			providers: [
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([
							{
								id: '1',
								name: radarName,
								lastUpdatedDate: '12/1/2020',
								config: {
									name: radarName,
									csv: 'string',
								},
								sectors: [],
								rings: [],
							},
						]),
						radarDataItems$: of([]),
					},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(EditDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('radarName$ should emit correct name', () => {
		component.radarName$.subscribe((value: string) => expect(value).toBe(radarName));
	});
});
