import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

export class CustomSelectOverlay extends Overlay {
	private readonly OVERLAY_PANEL_CLASS: string = 'drop-down__overlay-panel';

	public create(config?: OverlayConfig): OverlayRef {
		if (Boolean(config) && Boolean(config.panelClass)) {
			if (Array.isArray(config.panelClass)) {
				config.panelClass.push(this.OVERLAY_PANEL_CLASS);
			} else {
				config.panelClass = [config.panelClass, this.OVERLAY_PANEL_CLASS];
			}
		} else {
			if (config) {
				config.panelClass = [this.OVERLAY_PANEL_CLASS];
			} else {
				config = { panelClass: [this.OVERLAY_PANEL_CLASS] };
			}
		}

		return super.create(config);
	}
}
