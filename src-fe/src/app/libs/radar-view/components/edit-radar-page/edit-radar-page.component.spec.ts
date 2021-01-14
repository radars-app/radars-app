import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { IconService } from 'src/app/libs/common-components/icon/service/icon.service';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { RadarEditorModule } from 'src/app/libs/radar-editor/radar-editor.module';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { EditRadarPageComponent } from './edit-radar-page.component';

describe('EditRadarPageComponent', () => {
	let component: EditRadarPageComponent;
	let fixture: ComponentFixture<EditRadarPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EditRadarPageComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						paramMap: of(
							convertToParamMap({
								id: '1',
							})
						),
					},
				},
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([{ config: {} }]),
						loadRadars: jasmine.createSpy(),
					},
				},
			],
			imports: [CommonComponentsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientModule, RadarEditorModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(EditRadarPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
