import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';

import { EditDialogComponent } from './edit-dialog.component';

describe('EditDialogComponent', () => {
	let component: EditDialogComponent;
	let fixture: ComponentFixture<EditDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EditDialogComponent],
			imports: [CommonComponentsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
