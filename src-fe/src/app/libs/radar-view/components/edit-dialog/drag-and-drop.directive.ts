import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[appRadarsDragAndDrop]',
})
export class DragAndDropDirective {
	@HostBinding('class.fileover') public fileOver: boolean;
	@Output() public fileDropped: EventEmitter<any> = new EventEmitter<any>();

	// Dragover listener
	@HostListener('dragover', ['$event'])
	public onDragOver(evt: DragEvent): void {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = true;
	}

	// Dragleave listener
	@HostListener('dragleave', ['$event'])
	public onDragLeave(evt: DragEvent): void {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = false;
	}

	// Drop listener
	@HostListener('drop', ['$event'])
	public ondrop(evt: DragEvent): void {
		evt.preventDefault();
		evt.stopPropagation();
		this.fileOver = false;
		const files: FileList = evt.dataTransfer.files;
		if (files.length > 0) {
			this.fileDropped.emit(files);
		}
	}
}
