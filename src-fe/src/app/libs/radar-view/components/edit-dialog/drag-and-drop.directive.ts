import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[appRadarsDragAndDrop]',
})
export class DragAndDropDirective {
	@HostBinding('class.fileover') public fileOver: boolean;
	@Output() public fileDropped: EventEmitter<any> = new EventEmitter<any>();

	@HostListener('dragover', ['$event'])
	public onDragOver(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.fileOver = true;
	}

	@HostListener('dragleave', ['$event'])
	public onDragLeave(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.fileOver = false;
	}

	@HostListener('drop', ['$event'])
	public ondrop(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.fileOver = false;
		const files: FileList = event.dataTransfer.files;
		if (files.length > 0) {
			this.fileDropped.emit(files);
		}
	}
}
