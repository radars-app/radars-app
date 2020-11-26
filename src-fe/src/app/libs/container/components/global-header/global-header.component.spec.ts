import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';

import { GlobalHeaderComponent } from './global-header.component';

describe('GlobalHeaderComponent', () => {
	let component: GlobalHeaderComponent;
	let fixture: ComponentFixture<GlobalHeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GlobalHeaderComponent],
			imports: [CommonComponentsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GlobalHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
