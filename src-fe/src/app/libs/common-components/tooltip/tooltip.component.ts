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
export class TooltipComponent implements OnInit, OnChanges, OnDestroy {
	@ViewChild('tooltipContent', { static: false }) public tooltipContent: ElementRef<HTMLDivElement>;

	@Input()
	public options: TooltipOptions;
	public positioner: Popper;

	public isTooltipVisible: BehaviorSubject<boolean>;

	private destroy$: Subject<void>;

	constructor() {}

	public ngOnInit(): void {
		this.destroy$ = new Subject<void>();
		this.isTooltipVisible = new BehaviorSubject(false);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (!changes.options.firstChange) {
			this.tooltipContent.nativeElement.style.transition = `opacity 0s ${this.options.delay}`;
			this.positioner = createPopper(this.options.target, this.tooltipContent.nativeElement, {
				placement: this.options.placement,
			});
			this.initVisibilityBehavior(this.options.target);
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
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
