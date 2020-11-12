import { Component, OnInit, Input } from '@angular/core';

import appConfig from '../../../../../app-config.json';

@Component({
  selector: 'app-radars-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent implements OnInit {
  @Input() public userPhotoURL: string;

  public showProfilePopup: boolean;

  public appNamePrefix: string = appConfig.appName.prefix;

  public appNameMain: string = appConfig.appName.main;

  visible = false;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  change() {
    this.visible = true;
  }

  toggleProfilePopup(): void {
  this.showProfilePopup = !this.showProfilePopup;
  }

}
