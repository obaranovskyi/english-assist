import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { WordModel } from '../../models';

@Component({
  selector: 'ea-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements AfterViewInit {
  dataSource: any;

  @Output() removeWord: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() updateWord: EventEmitter<WordModel> = new EventEmitter<WordModel>();

  @Input()
  set data(words: WordModel[]) {
    this.dataSource = new MatTableDataSource<WordModel>(words);
  }

  displayedColumns: string[] = ['originalValue', 'translation', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
