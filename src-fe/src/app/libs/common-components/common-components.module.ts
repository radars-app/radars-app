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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { RadarHeaderComponent } from './radar-header/radar-header.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { IconService } from './icon/service/icon.service';
import { AccordionComponent } from './accordion/accordion.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { RadarCardComponent } from './radar-card/radar-card.component';
import { DragAndDropDirective } from '../directives/drag-and-drop.directive';
import { DropDownComponent } from './drop-down/drop-down.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { MatRadioModule } from '@angular/material/radio';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { EditorPanelComponent } from './editor-panel/editor-panel.component';
import { UploadConfigDialogComponent } from './upload-config-dialog/upload-config-dialog.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';

@NgModule({
	declarations: [
		SlideToggleComponent,
		ButtonComponent,
		RadarHeaderComponent,
		IconComponent,
		IconButtonComponent,
		AccordionComponent,
		InfoDialogComponent,
		TextInputComponent,
		TooltipComponent,
		RadarCardComponent,
		DropZoneComponent,
		DragAndDropDirective,
		DropDownComponent,
		RadioGroupComponent,
		EditorPanelComponent,
		UploadConfigDialogComponent,
		ModalWindowComponent,
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
		FormsModule,
		MatAutocompleteModule,
		MatSelectModule,
		MatRadioModule,
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
		PerfectScrollbarComponent,
		InfoDialogComponent,
		TextInputComponent,
		TooltipComponent,
		RadarCardComponent,
		DropDownComponent,
		DropZoneComponent,
		RadioGroupComponent,
		EditorPanelComponent,
		UploadConfigDialogComponent,
		ModalWindowComponent,
	],
})
export class CommonComponentsModule {}
