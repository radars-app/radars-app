import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserPhotoConverterService {
	constructor() {}

	public fromDto(dto: HttpResponse<Blob>): Observable<string> {
		const promise: Promise<string> = new Promise((resolve: Function) => {
			const reader: FileReader = new FileReader();
			reader.readAsDataURL(dto.body);
			reader.onloadend = () => {
				const base64data: string = reader.result as string;
				resolve(base64data);
			};
		});

		return from(promise);
	}
}
