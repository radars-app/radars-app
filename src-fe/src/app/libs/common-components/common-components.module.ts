import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonComponent } from './button/button.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [SlideToggleComponent, ButtonComponent],
	imports: [MatButtonModule, CommonModule, MatSlideToggleModule, MatIconModule, MatCardModule],
	exports: [ButtonComponent, SlideToggleComponent, MatCard],
})
export class CommonComponentsModule {}
