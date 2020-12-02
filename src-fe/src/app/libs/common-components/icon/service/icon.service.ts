import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class IconService {
	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

	public addIcons(): void {
		this.matIconRegistry.addSvgIcon('edit_1', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/edit-1.svg'));
		this.matIconRegistry.addSvgIcon('delete', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/delete.svg'));
		this.matIconRegistry.addSvgIcon('print', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/print.svg'));
		this.matIconRegistry.addSvgIcon(
			'ring_legend',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/ring_legend.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'ring_legend_base',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/ring_legend_base.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'download',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/download.svg')
		);
	}
}
