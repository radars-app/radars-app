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

  public appName: string = appConfig.appName;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  toggleProfilePopup(): void {
  this.showProfilePopup = !this.showProfilePopup;
  }

}
