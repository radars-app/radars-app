import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';

import { RadarEditorNavigationComponent } from './radar-editor-navigation.component';

describe('RadarEditorNavigationComponent', () => {
	let component: RadarEditorNavigationComponent;
	let fixture: ComponentFixture<RadarEditorNavigationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarEditorNavigationComponent],
			imports: [CommonComponentsModule, RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarEditorNavigationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
