import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { RadarHeaderComponent } from './radar-header/radar-header.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { IconService } from './icon/service/icon.service';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
	declarations: [SlideToggleComponent, ButtonComponent, RadarHeaderComponent, IconComponent, IconButtonComponent, AccordionComponent],
	imports: [MatButtonModule, CommonModule, MatSlideToggleModule, MatIconModule, MatCardModule, MatExpansionModule],
	providers: [IconService],
	exports: [ButtonComponent, SlideToggleComponent, MatCard, RadarHeaderComponent, IconButtonComponent, IconComponent, AccordionComponent],
})
export class CommonComponentsModule {}
