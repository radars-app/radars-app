import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthConverterService {
	constructor() {}

	public convertToPhotoURL(response): Observable<string> {
		const promise: Promise<string> = new Promise((resolve: Function, reject: Function) => {
			let base64data: string;
			console.log(response);
			const reader: FileReader = new FileReader();
			reader.readAsDataURL(response.body);
			reader.onloadend = () => {
				base64data = reader.result as string;
				resolve(base64data);
			};
		});
		return from(promise);
	}
}
