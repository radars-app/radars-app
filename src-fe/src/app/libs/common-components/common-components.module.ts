import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonComponent } from './button/button.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { RadarHeaderComponent } from './radar-header/radar-header.component';

@NgModule({
	declarations: [SlideToggleComponent, ButtonComponent, RadarHeaderComponent],
	imports: [MatButtonModule, CommonModule, MatSlideToggleModule, MatIconModule, MatCardModule],
	exports: [ButtonComponent, SlideToggleComponent, MatCard, RadarHeaderComponent],
})
export class CommonComponentsModule {}
