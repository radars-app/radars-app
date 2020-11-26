import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ContainerFacadeService } from '../container/service/container-facade.service';

import { RadarViewComponent } from './radar-view.component';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { of } from 'rxjs';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { RadarHeaderComponent } from '../common-components/radar-header/radar-header.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RadarViewComponent', () => {
	let component: RadarViewComponent;
	let fixture: ComponentFixture<RadarViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarViewComponent, SideNavigationComponent, EditDialogComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
			],
			imports: [CommonComponentsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
