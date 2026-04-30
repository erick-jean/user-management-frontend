import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject, Input } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<T> implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() columns: { key: string; name: string; sortable?: boolean }[] = [];

  @Input() data: T[] = [];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatSort) sort!: MatSort;

  get displayedColumns(): string[] {
    return this.columns.map((column) => column.key);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
