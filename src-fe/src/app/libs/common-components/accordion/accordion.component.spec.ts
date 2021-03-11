import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
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
			imports: [MatExpansionModule],
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
		spyOn(component.subItemClicked$, 'emit');
		fixture.detectChanges();

		component.emitSubItemClick('testID');

		expect(component.subItemClicked$.emit).toHaveBeenCalled();
	});

	describe('when openAccordionByItemId calles', () => {
		describe('with exisitng item', () => {
			beforeEach(() => {
				component.items = [
					{
						title: 'title',
						opened: false,
						color: '#123123',
						children: [{ id: 'test', title: 'test', number: 2 }],
					},
				];
				component.openAccordionByItemId('test');
			});

			it('opens item', () => {
				expect(component.items[0].opened).toBe(true);
			});
		});

		describe('with not exisitng item', () => {
			beforeEach(() => {
				component.items = [
					{
						title: 'title',
						opened: false,
						color: '#123123',
						children: [{ id: 'test', title: 'test', number: 2 }],
					},
				];
				component.openAccordionByItemId('test_not_exists');
			});

			it('not opens item', () => {
				expect(component.items[0].opened).toBe(false);
			});
		});
	});
});
