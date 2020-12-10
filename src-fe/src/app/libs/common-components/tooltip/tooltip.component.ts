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
import Tether, { ITetherOptions } from 'tether';
import { TooltipTrigger } from './models/tooltip-trigger';
import { TooltipOptions } from './models/tooltip-options';
import { TooltipReposition } from './models/tooltip-reposition';

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

	public isTooltipVisible: BehaviorSubject<boolean>;

	private destroy$: Subject<void>;

	constructor() {}

	public ngOnInit(): void {
		this.destroy$ = new Subject<void>();
		this.isTooltipVisible = new BehaviorSubject(false);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (!changes.options.firstChange) {
			const target: Element = changes.options.currentValue.target;
			this.positionTooltip(target);
			this.initVisibilityBehavior(target as HTMLElement);
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private positionTooltip(target: Element): Tether {
		let tetherOptions: ITetherOptions;
		switch (this.options.repositionOptions) {
			case TooltipReposition.TopCenter:
				tetherOptions = {
					element: this.tooltipContent.nativeElement,
					target,
					attachment: 'bottom center',
					targetAttachment: this.options.repositionOptions,
				};
		}
		return new Tether(tetherOptions);
	}

	private initVisibilityBehavior(target: HTMLElement): void {
		if (this.options.trigger.includes(TooltipTrigger.OnHover)) {
			target.onmouseover = () => {
				this.isTooltipVisible.next(true);
			};
			target.onmouseout = () => {
				this.isTooltipVisible.next(false);
			};
		}
	}
}
