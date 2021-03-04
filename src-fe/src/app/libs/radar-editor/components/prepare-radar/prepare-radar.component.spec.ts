import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { IconService } from 'src/app/libs/common-components/icon/service/icon.service';
import { Radar } from 'src/app/libs/radar-view/model/radar';
import { PrepareRadarComponent } from './prepare-radar.component';

describe('PrepareRadarComponent', () => {
	let component: PrepareRadarComponent;
	let fixture: ComponentFixture<PrepareRadarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PrepareRadarComponent],
			imports: [CommonComponentsModule, BrowserAnimationsModule, HttpClientModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(PrepareRadarComponent);
		component = fixture.componentInstance;
		component.radar = {} as Radar;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
