import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CacheModel } from '../../models';

import { ValueDialogComponent } from '../value-dialog/value-dialog.component';
import { WordsService } from '../../words.service';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'ea-cache-grid',
  templateUrl: './cache-grid.component.html',
  styleUrls: ['./cache-grid.component.scss'],
})
export class CacheGridComponent implements AfterViewInit {
  dataSource: any;

  constructor(
    public readonly dialog: MatDialog,
    public readonly cacheService: CacheService,
    public readonly wordService: WordsService
  ) {}

  @Input()
  set data(cache: CacheModel[]) {
    this.dataSource = new MatTableDataSource<CacheModel>(cache);
  }

  displayedColumns: string[] = ['name', 'date', 'value'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showValue(value: string) {
    this.dialog.open(ValueDialogComponent, { data: { value } });
  }

  applyCache(value: string) {
    this.wordService.setWords(JSON.parse(value));
  }

  removeCache(name: string) {
    this.cacheService.removeCacheByName(name);
  }
}
