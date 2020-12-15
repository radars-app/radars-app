import { TooltipPlacement } from './tooltip-placement';
import { TooltipTrigger } from './tooltip-trigger';

export interface TooltipOptions {
	target: HTMLElement;
	placement: TooltipPlacement;
	trigger: TooltipTrigger[];
}
