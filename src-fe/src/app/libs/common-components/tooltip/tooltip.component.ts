import {
	AfterViewInit,
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
import { tooltipAttachment } from './models/tooltip-attachement';

@Component({
	selector: 'app-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('tooltipContent', { static: false }) public tooltipContent: ElementRef<HTMLDivElement>;

	@Input()
	public options: TooltipOptions;

	public isTooltipVisible: BehaviorSubject<boolean>;
	public positioner: Tether;

	private destroy$: Subject<void>;

	constructor() {}

	public ngOnInit(): void {
		this.destroy$ = new Subject<void>();
		this.isTooltipVisible = new BehaviorSubject(false);
	}

	public ngAfterViewInit(): void {
		this.positioner = this.positionTooltip(this.options.target);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private positionTooltip(target: string): Tether {
		let tetherOptions: ITetherOptions;
		const reposition: TooltipReposition = this.options.repositionOptions;
		switch (reposition) {
			case TooltipReposition.TopCenter:
				tetherOptions = {
					element: this.tooltipContent.nativeElement,
					target,
					targetAttachment: reposition,
					attachment: tooltipAttachment.get(reposition),
				};
		}
		return new Tether(tetherOptions);
	}

	private updatePosition(): void {
		this.positioner.position();
	}

	private initVisibilityBehavior(target: string): void {
		const targetElement: HTMLElement = document.querySelector(target);
		if (this.options.trigger.includes(TooltipTrigger.OnHover)) {
			targetElement.onmouseenter = () => {
				this.isTooltipVisible.next(true);
			};
			targetElement.onmouseleave = () => {
				this.isTooltipVisible.next(false);
			};
		}
	}
}
