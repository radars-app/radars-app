import { HighlightTextPipe } from './highlight-text.pipe';

describe('HighlightTextPipe', () => {
	it('create an instance', () => {
		const pipe: HighlightTextPipe = new HighlightTextPipe();
		expect(pipe).toBeTruthy();
	});
});
