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
import { TooltipTrigger } from './models/tooltip-trigger';
import { TooltipOptions } from './models/tooltip-options';
import { createPopper, Instance as Popper } from '@popperjs/core';

@Component({
	selector: 'app-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit, OnChanges, OnDestroy {
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

	public ngOnDestroy(): void {
		if (this.options.trigger.includes(TooltipTrigger.OnClick)) {
			window.removeEventListener('click', this.hideTooltip.bind(this));
		}
	}

	private initVisibilityBehavior(target: HTMLElement): void {
		if (this.options.trigger.includes(TooltipTrigger.OnHover)) {
			target.onmouseenter = () => {
				this.showTooltip();
			};
			target.onmouseleave = () => {
				this.hideTooltip();
			};
		}

		if (this.options.trigger.includes(TooltipTrigger.OnClick)) {
			target.onclick = (event: MouseEvent) => {
				event.stopPropagation();
				this.showTooltip();
			};

			window.addEventListener('click', this.hideTooltip.bind(this));
		}
	}

	private showTooltip(): void {
		this.isTooltipVisible.next(true);
	}

	private hideTooltip(): void {
		this.isTooltipVisible.next(false);
	}
}
