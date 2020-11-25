export interface RadarConfig {
	name: string;
	csv: string;
	ringColumn: string;
	sectorColumn: string;
	contentColumn: string;
	dotNameColumn: string;
	ringColumnMapping: string[][];
	sectorColumnMapping: string[][];
}
