import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { IconService } from '../../../common-components/icon/service/icon.service';

import { ClusterTooltipComponent } from './cluster-tooltip.component';

describe('ClusterTooltipComponent', () => {
	let component: ClusterTooltipComponent;
	let fixture: ComponentFixture<ClusterTooltipComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ClusterTooltipComponent],
			imports: [CommonComponentsModule, HttpClientModule],
		}).compileComponents();

		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();

		fixture = TestBed.createComponent(ClusterTooltipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
