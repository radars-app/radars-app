import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PopoverComponent } from '../../../common-components/popover/popover.component';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';

@Component({
	selector: 'app-radars-edit-dialog',
	templateUrl: './edit-dialog.component.html',
	styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
	@ViewChild('radarsPopover', { static: true })
	public readonly radarsPopover: PopoverComponent;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	public radarID: string;

	constructor(private radarViewFacadeSevice: RadarViewFacadeService, private route: ActivatedRoute) {}

	public ngOnInit(): void {
		this.route.paramMap.pipe(switchMap((params: ParamMap) => params.getAll('id'))).subscribe((radarID: string) => {
			this.radarID = radarID;
		});
	}

	public open(): void {
		this.radarsPopover.open();
	}

	public downloadConfigFile() {
		this.radarViewFacadeSevice.downloadRadarConfigFile(this.radarID);
	}
}
