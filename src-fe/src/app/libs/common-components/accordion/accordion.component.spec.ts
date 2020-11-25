import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ContainerFacadeService } from '../../container/service/container-facade.service';

import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
	let component: AccordionComponent;
	let fixture: ComponentFixture<AccordionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccordionComponent],
			providers: [
				{
					provide: Store,
					useValue: {},
				},
				{
					provide: ContainerFacadeService,
					useValue: {},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccordionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit clicked ID', () => {
		spyOn(component.subItemClickEvent$, 'emit');
		fixture.detectChanges();

		component.emitSubItemClick('testID');

		expect(component.subItemClickEvent$.emit).toHaveBeenCalled();
	});
});
