import { TooltipReposition } from './tooltip-reposition';
import { TooltipTrigger } from './tooltip-trigger';

export interface TooltipOptions {
	target: Element;
	repositionOptions: TooltipReposition;
	trigger: TooltipTrigger[];
}
