import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ContainerFacadeService } from '../../container/service/container-facade.service';
import { CommonComponentsModule } from '../common-components.module';

import { RadarHeaderComponent } from './radar-header.component';

describe('RadarHeaderComponent', () => {
	let component: RadarHeaderComponent;
	let fixture: ComponentFixture<RadarHeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarHeaderComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {},
				},
				{
					provide: Store,
					useValue: {},
				},
			],
			imports: [CommonComponentsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
