import { TooltipPlacement } from './tooltip-placement';
import { TooltipTrigger } from './tooltip-trigger';

export interface TooltipOptions {
	target: Element;
	placement: TooltipPlacement;
	trigger: TooltipTrigger[];
}
