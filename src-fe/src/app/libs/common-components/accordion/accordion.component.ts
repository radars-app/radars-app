import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContainerFacadeService } from '../../container/service/container-facade.service';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { AccordionItem } from './models/accordion-item.models';

@Component({
	selector: 'app-radars-accordion',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
	@Output() public subItemClickEvent$: EventEmitter<string> = new EventEmitter();

	@Input() public items: AccordionItem[];

	@Input() public darkTheme$: Observable<boolean> = of(false);

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {}

	public emitSubItemClick(id: string): void {
		this.subItemClickEvent$.emit(id);
	}
}
