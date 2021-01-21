import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { ScannedActionsSubject } from '@ngrx/store';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { IconService } from '../../../common-components/icon/service/icon.service';
import { ContainerFacadeService } from '../../../container/service/container-facade.service';
import { RadarEditorModule } from '../../../radar-editor/radar-editor.module';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { CreateRadarPageComponent } from './create-radar-page.component';

describe('CreateRadarPageComponent', () => {
	let component: CreateRadarPageComponent;
	let fixture: ComponentFixture<CreateRadarPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CreateRadarPageComponent],
			imports: [
				RouterTestingModule,
				CommonComponentsModule,
				CommonModule,
				BrowserAnimationsModule,
				RadarEditorModule,
				HttpClientModule,
			],
			providers: [
				Actions,
				ScannedActionsSubject,
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
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(CreateRadarPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
