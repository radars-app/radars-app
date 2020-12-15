import { TooltipReposition } from './tooltip-reposition';
import { TooltipTrigger } from './tooltip-trigger';

export interface TooltipOptions {
	target: string;
	repositionOptions: TooltipReposition;
	trigger: TooltipTrigger[];
}
