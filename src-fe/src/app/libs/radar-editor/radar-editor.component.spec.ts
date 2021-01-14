import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconService } from '../common-components/icon/service/icon.service';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { RadarEditorComponent } from './radar-editor.component';

describe('RadarEditorComponent', () => {
	let component: RadarEditorComponent;
	let fixture: ComponentFixture<RadarEditorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarEditorComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
			],
			imports: [CommonComponentsModule, RouterTestingModule, CommonModule, BrowserAnimationsModule],
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
