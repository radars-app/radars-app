import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
	public transform(value: string, arg: string): unknown {
		if (!Boolean(arg) || typeof arg !== 'string') {
			return value;
		}

		const regex: RegExp = new RegExp(arg, 'gi');
		const match: RegExpMatchArray = value.match(regex);

		if (!match) {
			return value;
		}

		return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
	}
}
