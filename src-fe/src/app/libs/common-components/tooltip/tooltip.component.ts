import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { TooltipTrigger } from './models/tooltip-trigger';
import { TooltipOptions } from './models/tooltip-options';
import { createPopper, Instance as Popper } from '@popperjs/core';

@Component({
	selector: 'app-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit, OnChanges {
	@ViewChild('tooltipContent', { static: false }) public tooltipContent: ElementRef<HTMLDivElement>;

	@Input()
	public options: TooltipOptions;
	public positioner: Popper;

	public isTooltipVisible: BehaviorSubject<boolean>;

	constructor() {}

	public ngOnInit(): void {
		this.isTooltipVisible = new BehaviorSubject(false);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (!changes.options.firstChange) {
			this.tooltipContent.nativeElement.style.transition = `opacity 0s ${this.options.delay}`;
			this.positioner = createPopper(this.options.target, this.tooltipContent.nativeElement, {
				placement: this.options.placement,
				modifiers: [
					{
						name: 'preventOverflow',
						options: {
							mainAxis: false,
							altAxis: false,
						},
					},
					{
						name: 'flip',
						options: {
							fallbackPlacements: [],
							flipVariations: false,
						},
					},
				],
			});
			this.initVisibilityBehavior(this.options.target);
		}
	}

	private initVisibilityBehavior(target: HTMLElement): void {
		if (this.options.trigger.includes(TooltipTrigger.OnHover)) {
			target.onmouseenter = () => {
				this.isTooltipVisible.next(true);
			};
			target.onmouseleave = () => {
				this.isTooltipVisible.next(false);
			};
		}
	}
}
