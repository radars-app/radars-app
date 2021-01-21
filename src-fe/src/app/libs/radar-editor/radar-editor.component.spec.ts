import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconService } from '../common-components/icon/service/icon.service';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { PrepareRadarComponent } from './components/prepare-radar/prepare-radar.component';
import { RadarEditorNavigationComponent } from './components/radar-editor-navigation/radar-editor-navigation.component';
import { RadarEditorComponent } from './radar-editor.component';
import { RadarEditorModule } from './radar-editor.module';

describe('RadarEditorComponent', () => {
	let component: RadarEditorComponent;
	let fixture: ComponentFixture<RadarEditorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarEditorComponent, PrepareRadarComponent, RadarEditorNavigationComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
			],
			imports: [CommonComponentsModule, CommonModule, RouterTestingModule, RadarEditorModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(RadarEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
