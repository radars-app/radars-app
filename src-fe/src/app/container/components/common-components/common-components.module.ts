import { CompilerFactory, COMPILER_OPTIONS, NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { ButtonComponent } from './components/button/button.component';
import { PopoverComponent } from './components/popover/popover.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
	declarations: [SlideToggleComponent, CheckboxComponent, ButtonComponent, InputComponent, PopoverComponent],
	imports: [
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		CommonModule,
		MatTooltipModule,
		MatSlideToggleModule,
		FormsModule,
		MatCardModule,
		MatCheckboxModule,
		MatRadioModule,
		MatSortModule,
	],
	exports: [
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		CommonModule,
		FormsModule,
		MatCardModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatTooltipModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		FormsModule,
		ButtonComponent,
		SlideToggleComponent,
		CheckboxComponent,
		InputComponent,
		PopoverComponent,
		MatSortModule,
		MatBadgeModule,
		MatToolbarModule,
		MatSelectModule,
		MatDividerModule,
	],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {},
		},
		{
			provide: CompilerFactory,
			useClass: JitCompilerFactory,
			deps: [COMPILER_OPTIONS],
		},
	],
})
export class CommonComponentsModule {}
