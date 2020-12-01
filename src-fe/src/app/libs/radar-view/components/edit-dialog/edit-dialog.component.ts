import { Component, Input, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PopoverComponent } from '../../../common-components/popover/popover.component';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RadarEntity } from '../../model/radar-entity.model';

@Component({
	selector: 'app-radars-edit-dialog',
	templateUrl: './edit-dialog.component.html',
	styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
	@ViewChild('radarsPopover', { static: true })
	public readonly radarsPopover: PopoverComponent;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	public radarsURI$: Observable<SafeUrl> = this.radarViewFacadeSevice.activeRadars$.pipe(
		map((activeRadars: RadarEntity[]) => {
			const theJSON: string = JSON.stringify(activeRadars);
			const blob: Blob = new Blob([theJSON], { type: 'text/json' });
			const url: string = window.URL.createObjectURL(blob);
			const uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);

			return uri;
		})
	);

	public radarName$: Observable<string> = this.radarViewFacadeSevice.activeRadars$.pipe(
		map((activeRadars: RadarEntity[]) => {
			if (activeRadars) {
				return activeRadars[0]?.name;
			}
		})
	);

	constructor(private radarViewFacadeSevice: RadarViewFacadeService, private sanitizer: DomSanitizer) {}

	public open(): void {
		this.radarsPopover.open();
	}
}
