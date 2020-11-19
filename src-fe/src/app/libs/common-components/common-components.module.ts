import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonComponent } from './button/button.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';

@NgModule({
	declarations: [SlideToggleComponent, ButtonComponent],
	imports: [MatButtonModule, CommonModule, MatSlideToggleModule],
	exports: [ButtonComponent, SlideToggleComponent],
})
export class CommonComponentsModule {}
