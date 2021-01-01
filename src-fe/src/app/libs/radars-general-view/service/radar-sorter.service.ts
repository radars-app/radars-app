import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class RadarSorterService {
	constructor() {}

	public sortByDate(radarListElement: HTMLDivElement, dateClassName: string, isNewestToOldest: boolean): void {
		Array.from(radarListElement.children)
			.sort((radarElementA: HTMLElement, radarElementB: HTMLElement): number => {
				const radarDateA: number = +new Date(radarElementA.querySelector('.' + dateClassName).textContent);
				const radarDateB: number = +new Date(radarElementB.querySelector('.' + dateClassName).textContent);
				if (isNewestToOldest) {
					return radarDateA > radarDateB ? 1 : -1;
				} else {
					return radarDateA < radarDateB ? 1 : -1;
				}
			})
			.forEach((node: Node) => {
				radarListElement.appendChild(node);
			});
	}

	public sortAlphabetical(radarListElement: HTMLDivElement, radarTitleClassName: string, isAtoZ: boolean): void {
		Array.from(radarListElement.children)
			.sort((radarElementA: HTMLElement, radarElementB: HTMLElement): number => {
				const radarTitleA: string = radarElementA.querySelector('.' + radarTitleClassName).textContent;
				const radarTitleB: string = radarElementB.querySelector('.' + radarTitleClassName).textContent;
				if (isAtoZ) {
					return radarTitleA > radarTitleB ? 1 : -1;
				} else {
					return radarTitleA < radarTitleB ? 1 : -1;
				}
			})
			.forEach((node: Node) => {
				radarListElement.appendChild(node);
			});
	}
}
