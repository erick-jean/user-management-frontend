import {
  AfterViewInit,
  Component,
  ViewChild,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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

  @Input() columns: TableColumn<T>[] = [];

  @Input() data: T[] = [];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatSort) sort!: MatSort;

  get displayedColumns(): string[] {
    return this.columns.map((column) => String(column.key));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
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
