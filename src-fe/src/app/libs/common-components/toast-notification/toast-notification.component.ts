import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { ToastNotificationService } from './service/toast-notification.service';

@Component({
	selector: 'app-toast-notification',
	templateUrl: './toast-notification.component.html',
	styleUrls: ['./toast-notification.component.scss'],
	animations: [
		trigger('flyInOut', [
			state(
				'inactive',
				style({
					opacity: 0,
				})
			),
			transition(
				'inactive => active',
				animate(
					'300ms ease-in',
					keyframes([
						style({
							transform: 'translate3d(0, 100%, 0)',
							opacity: 0.9,
						}),
						style({
							transform: 'none',
							opacity: 1,
						}),
					])
				)
			),
			transition(
				'active => removed',
				animate(
					'300ms ease-out',
					keyframes([
						style({
							opacity: 0,
						}),
						style({
							transform: 'translate3d(0, 100%, 0)',
							opacity: 0.9,
						}),
					])
				)
			),
		]),
	],
})
export class ToastNotificationComponent extends Toast implements OnDestroy {
	public destroy$: Subject<void>;
	public isDarkTheme: boolean;

	constructor(toastrService: ToastrService, toastPackage: ToastPackage) {
		super(toastrService, toastPackage);
		this.state.params.easing = 'ease-out';

		this.destroy$ = new Subject<void>();

		ToastNotificationService.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme: ComponentTheme) => {
			this.isDarkTheme = theme === ComponentTheme.Dark;
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public close(): void {
		this.remove();
	}
}
