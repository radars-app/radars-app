import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Compiler, Component, ComponentFactory, ComponentRef, EventEmitter, Input, ModuleWithComponentFactories, NgModule, OnDestroy, OnInit, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../../../../../../shared/component-theme.enum';
import { ButtonComponent } from '../button/button.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { InputComponent } from '../input/input.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { ColumnConfig, Column, TableColumnType } from './models/row-config.enum';

let tableTemplate: string = '';
@Component({
	selector: 'app-table',
	template: '<ng-container #table></ng-container>',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableComponent <T> implements OnInit, OnDestroy {

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public columnsConfig: ColumnConfig[];

	@Input()
	public data: T[];

	@Input()
	public headerButtonText: string;

	@Input()
	public headerButtonIcon: string;

	@Input()
	public rowButtonIcon: string;

	@Output()
	public toggled: EventEmitter<T> = new EventEmitter();

	@Output()
	public checked: EventEmitter<T[]> = new EventEmitter();

	@Output()
	public headerButtonClicked: EventEmitter<T[]> = new EventEmitter();

	@Output()
	public rowButtonClicked: EventEmitter<T> = new EventEmitter();

	@ViewChild('table', {read: ViewContainerRef})
	public container: ViewContainerRef;

	public columns: Column[] = [];

	public displayedColumns: string[] = [];

	private hasTextSortable: boolean;

	private destroy$: Subject<any> = new Subject();

	constructor(
		private viewContainer: ViewContainerRef,
		private compiler: Compiler) {
	}

	public ngOnInit(): void {
		this.createDom();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public createDom(): void {
		let columns: string = '';

		for (const column of this.columnsConfig) {
			let element: string = null;
			switch (column.columnType) {
				case TableColumnType.Text:
					element = this.createTextColumn(column);
					this.displayedColumns.push(column.dataName);
					break;
				case TableColumnType.TextSortable:
					element = this.createTextSortableColumn(column);
					this.displayedColumns.push(column.dataName);
					this.hasTextSortable = true;
					break;
				case TableColumnType.Checkbox:
					element = this.createCheckboxColumn(column);
					this.displayedColumns.push(column.dataName);
					break;
				case TableColumnType.Toggle:
					element = this.createToggleColumn(column);
					this.displayedColumns.push(column.dataName);
					break;
			}

			columns = columns + ` ${element}`;
		}
		this.displayedColumns.push('button');

		this.setTemplate(columns);

		const component: any = this.createDynamicComponent();
		const module: any = this.createDynamicModule(component);
		this.renderTableInnerComponent(component, module);
	}

	public createTextColumn(column: ColumnConfig): string {
		return	`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef> ${column.columnName} </th>
					<td mat-cell *matCellDef="let element"> {{element.${column.dataName}}} </td>
				</ng-container>`;
	}

	public createTextSortableColumn(column: ColumnConfig): string {
		return	`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef mat-sort-header> ${column.columnName} </th>
					<td mat-cell *matCellDef="let row"> {{row.${column.dataName}}} </td>
				</ng-container>`;
	}

	public createCheckboxColumn(column: ColumnConfig): string {
		return	`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef>
						<app-checkbox-group	class="checkbox-group-demo__container"
							[options]="checkboxGroupData.options"
							[checked]="selection.hasValue() && isAllSelected()"
							[theme]="theme"
							[indeterminate]="selection.hasValue() && !isAllSelected()"
							[labelField]="checkboxLabel()"
							[valueField]="checkboxGroupData.valueField"
							(change)="onCheckHeader($event)">
						</app-checkbox-group>
					</th>
					<td mat-cell *matCellDef="let row">
						<app-checkbox-group	class="checkbox-group-demo__container"
							(click)="$event.stopPropagation()"
							[options]="checkboxGroupData.options"
							[checked]="selection.isSelected(row)"
							[theme]="theme"
							[labelField]="checkboxLabel(row)"
							[valueField]="checkboxGroupData.valueField"
							(change)="$event ? onCheck(row) : null">
						</app-checkbox-group>
					</td>
				</ng-container>`;
	}

	public createToggleColumn(column: ColumnConfig): string {
		return	`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef> ${column.columnName} </th>
					<td mat-cell *matCellDef="let row">
						<app-slide-toggle
							[value]="false"
							[disabled]="false"
							[theme]=theme
							(toggled)="onToggle(row)"
							(click)="$event.stopPropagation()">
						</app-slide-toggle>
					</td>
				</ng-container>`;
	}

	public setTemplate(columns: string): void {
		const templateHeader: string =
			`<div class="table-header" [class.table-header--dark-theme]="isDarkTheme" [class.table-header--selected]="selection.selected.length">

				<app-input
					*ngIf="!selection.selected.length"
					#input
					(keyup)="applyFilter($event)"
					[type]="'text'"
					[theme]="theme"
					[label]="'Filter'"
					[placeholder]="'Find it'">
				</app-input>

				<p class="table-header__selected" *ngIf="selection.selected?.length">
					{{selection.selected.length}} {{selection.selected.length===1 ? 'user' : 'users'}} selected
				</p>
				<app-button
					type="outlined"
					[icon]="headerButtonIcon"
					[theme]="theme"
					*ngIf="selection.selected?.length"
					(click)="onHeaderButtonClick()">
					{{headerButtonText}}
				</app-button>

			</div>`;

		tableTemplate =
		`<div class="table">
			${templateHeader}

			<table mat-table [dataSource]="dataSource" class="mat-elevation-z8 table-content" [class.table-content--dark-theme]="isDarkTheme" matSort>

				${columns}

				<ng-container matColumnDef="button">
					<th mat-header-cell *matHeaderCellDef></th>
					<td class="table-content__row-button" mat-cell *matCellDef="let row">
						<app-button
							*ngIf="rowButtonIcon && this.hoverRow===row"
							type="basic"
							[icon]="rowButtonIcon"
							[theme]="theme"
							(click)="onRowButtonClick(row, $event)">
						</app-button>
					</td>
				</ng-container>

				<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
				<tr mat-row *matRowDef="let row; columns: displayedColumns;"
					(click)="onCheck(row)" (mouseenter)="onMouseIn(row)" [class.table-content__row--hover]="this.hoverRow===row">
				</tr>

				<tr class="mat-row" *matNoDataRow>
					<td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
				</tr>
			</table>
			</div>`;
	}

	public renderTableInnerComponent(component: any, module: any): void {
		this.compiler.compileModuleAndAllComponentsAsync(module)
		.then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
			const componentFactory: ComponentFactory<typeof component> =
			moduleWithFactories.componentFactories.find((x: ComponentFactory<any>) => x.componentType === component);
			const componentRef: ComponentRef<typeof component> = this.viewContainer.createComponent(componentFactory);
			this.setInputsToInnerComponent(componentRef);
			this.handleToggleOutput(componentRef);
			this.handleCheckboxOutput(componentRef);
			this.handleHeaderButtonOutput(componentRef);
			this.handleRowButtonOutput(componentRef);
		})
		.catch((error: Error) => {
			console.log(error);
		});
	}

	public setInputsToInnerComponent(componentRef: any): void {
		componentRef.instance.theme = this.theme;
		componentRef.instance.data = this.data;
		componentRef.instance.headerButtonText = this.headerButtonText;
		componentRef.instance.headerButtonIcon = this.headerButtonIcon;
		componentRef.instance.rowButtonIcon = this.rowButtonIcon;
		componentRef.instance.displayedColumns = this.displayedColumns;
	}

	public handleToggleOutput(componentRef: any): void {
		componentRef.instance.toggled.pipe(takeUntil(this.destroy$)).subscribe((row: T) => this.toggled.emit(row));
	}

	public handleCheckboxOutput(componentRef: any): void {
		componentRef.instance.checked.pipe(takeUntil(this.destroy$)).subscribe((selected: T[]) => this.checked.emit(selected));
	}

	public handleHeaderButtonOutput(componentRef: any): void {
		componentRef.instance.headerButtonClicked.pipe(takeUntil(this.destroy$))
		.subscribe((selected: T[]) => this.headerButtonClicked.emit(selected));
	}
	public handleRowButtonOutput(componentRef: any): void {
		componentRef.instance.rowButtonClicked.pipe(takeUntil(this.destroy$)).subscribe((selected: T) => this.rowButtonClicked.emit(selected));
	}

	public createDynamicComponent(): any  {
		@Component({
			template: tableTemplate,
			jit: true,
			changeDetection: ChangeDetectionStrategy.OnPush})
		class CustomDynamicComponent implements OnInit, AfterViewInit  {

			@Input()
			public theme: ComponentTheme = ComponentTheme.Light;

			@Input()
			public data: T[];

			@Input()
			public displayedColumns: string[] = [];

			@Input()
			public headerButtonText: string;

			@Input()
			public headerButtonIcon: string;

			@Input()
			public rowButtonIcon: string;

			@Output()
			public toggled: EventEmitter<T> = new EventEmitter();

			@Output()
			public checked: EventEmitter<T[]> = new EventEmitter();

			@Output()
			public headerButtonClicked: EventEmitter<T[]> = new EventEmitter();

			@Output()
			public rowButtonClicked: EventEmitter<T> = new EventEmitter();

			@ViewChild(MatSort) sort: MatSort;
			public dataSource: MatTableDataSource<T>;

			public selection: SelectionModel<T> = new SelectionModel<T>(true, []);

			public selected: any;

			public hoverRow: T;

			public ngOnInit(): void {
				this.dataSource = new MatTableDataSource<T>(this.data);
			}

			public ngAfterViewInit(): void {
				this.dataSource.sort = this.sort;
			}

			/** Whether the number of selected elements matches the total number of rows. */
			public isAllSelected(): boolean {
			  const numSelected: number = this.selection.selected.length;
			  const numRows: number = this.dataSource.data.length;
			  return numSelected === numRows;
			}

			/** Selects all rows if they are not all selected; otherwise clear selection. */
			public masterToggle(): void {

			  this.isAllSelected() ?
				  this.selection.clear() :
				  this.dataSource.data.forEach((row: T) => this.selection.select(row));
			}

			/** The label for the checkbox on the passed row */
			public checkboxLabel(row?: T): string {
			  if (!row) {
				return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
			  }
			  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
			}

			public get isDarkTheme(): boolean {
				return this.theme === ComponentTheme.Dark;
			}

			public onToggle(row: T): void {
				this.toggled.emit(row);
			}

			public onCheckHeader(event: Event): void {
				if (event) {
					this.masterToggle();
				}
				this.checked.emit(this.selection.selected);
			}

			public onCheck(row: T): void {
				this.selection.toggle(row);
				this.checked.emit(this.selection.selected);
			}

			public applyFilter(event: Event): void {
				const filterValue: string = (event.target as HTMLInputElement).value;
				this.dataSource.filter = filterValue.trim().toLowerCase();
			}

			public onMouseIn(row: T): void {
				this.hoverRow = row;
			}

			public onHeaderButtonClick(): void {
				this.headerButtonClicked.emit(this.selection.selected);
			}

			public onRowButtonClick(row: T, event: Event): void {
				this.rowButtonClicked.emit(row);
				event.stopPropagation();
			}

		}

		return CustomDynamicComponent;
	}

	private createDynamicModule (component: Type<any>): any {

		const moduleClass: any = class RuntimeComponentModule {
		};
		const decoratedNgModule: typeof moduleClass =
			NgModule({
				imports: [
					CommonModule,
					MatCheckboxModule,
					MatSlideToggleModule,
					MatSortModule,
					MatTableModule,
					MatFormFieldModule,
					FormsModule,
					MatInputModule,
					MatButtonModule,
					MatIconModule,
					MatFormFieldModule,
					ReactiveFormsModule],
				declarations: [
					component,
					CheckboxComponent,
					SlideToggleComponent,
					ButtonComponent,
					InputComponent
				] })(moduleClass);

	return decoratedNgModule;
	}
}
