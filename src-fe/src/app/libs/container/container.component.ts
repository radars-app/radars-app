import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconService } from '../common-components/icon/service/icon.service';
import { ToastNotificationService } from '../common-components/toast-notification/service/toast-notification.service';
import { ContainerFacadeService } from './service/container-facade.service';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, OnDestroy {
	public userPhotoURL$: Observable<string>;
	public appTheme$: Observable<string>;
	public isDarkTheme$: Observable<boolean>;
	public isAdmin$: Observable<boolean>;
	public destroy$: Subject<void>;

	constructor(private containerFacadeService: ContainerFacadeService, private iconService: IconService) {
		this.destroy$ = new Subject<void>();
	}

	public ngOnInit(): void {
		this.userPhotoURL$ = this.containerFacadeService.userPhotoBase64$;
		this.appTheme$ = this.containerFacadeService.theme$;
		this.isDarkTheme$ = this.containerFacadeService.isDarkTheme$;
		this.isAdmin$ = this.containerFacadeService.isAdmin$;

		this.iconService.addIcons();
		this.containerFacadeService.logIn();

		this.containerFacadeService.loadUserProfile();

		this.containerFacadeService.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme: ComponentTheme) => {
			ToastNotificationService.theme$.next(theme);
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
