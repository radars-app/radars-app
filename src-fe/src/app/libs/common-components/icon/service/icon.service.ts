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
		this.matIconRegistry.addSvgIcon('zoom_in', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/plus.svg'));
		this.matIconRegistry.addSvgIcon('zoom_out', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/minus.svg'));
		this.matIconRegistry.addSvgIcon(
			'download',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/download.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'document',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/document.svg')
		);
		this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/close.svg'));
		this.matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/search.svg'));
		this.matIconRegistry.addSvgIcon(
			'arrow-down',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/arrow-down-3.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'arrow-down-2',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/arrow-down-2.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'arrow-up',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/arrow-up-3.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'arrow-up-2',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/arrow-up-2.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'sort-ascending',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/sort-ascending.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'sort-descending',
			this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/sort-descending.svg')
		);
	}
}
