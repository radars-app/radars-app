import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ComponentTheme } from '../../common/enum/component-theme.enum';

@Injectable({
	providedIn: 'root',
})
export class ToastNotificationService {
	public static theme$: BehaviorSubject<ComponentTheme> = new BehaviorSubject(ComponentTheme.Light);

	constructor(private toastrService: ToastrService) {}

	public success(title: string, message: string): void {
		this.toastrService.success(message, title);
	}

	public error(title: string, message: string): void {
		this.toastrService.error(message, title);
	}
}
