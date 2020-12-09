import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PerfectScrollbarComponent, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { RadarHeaderComponent } from './radar-header/radar-header.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { IconService } from './icon/service/icon.service';
import { AccordionComponent } from './accordion/accordion.component';
import { PopoverComponent } from './popover/popover.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { InputComponent } from './input/input.component';

@NgModule({
	declarations: [
		SlideToggleComponent,
		ButtonComponent,
		RadarHeaderComponent,
		IconComponent,
		IconButtonComponent,
		AccordionComponent,
		PopoverComponent,
		InfoDialogComponent,
		InputComponent,
		SearchInputComponent,
	],
	imports: [
		MatButtonModule,
		CommonModule,
		MatSlideToggleModule,
		MatIconModule,
		MatCardModule,
		MatExpansionModule,
		MatDialogModule,
		PerfectScrollbarModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	providers: [
		IconService,
		{
			provide: MatDialogRef,
			useValue: {},
		},
	],
	exports: [
		ButtonComponent,
		SlideToggleComponent,
		RadarHeaderComponent,
		IconButtonComponent,
		IconComponent,
		AccordionComponent,
		PopoverComponent,
		PerfectScrollbarComponent,
		InfoDialogComponent,
		SearchInputComponent,
	],
})
export class CommonComponentsModule {}
