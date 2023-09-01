import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { PreviousResult } from '../test/models';
import { TestResult } from './models';

@Component({
  selector: 'ea-result-grid',
  templateUrl: './result-grid.component.html',
  styleUrls: ['./result-grid.component.scss'],
})
export class ResultGridComponent implements AfterViewInit {
  dataSource: any;

  @Input()
  set data(results: PreviousResult[]) {
    const testResults: TestResult[] = [];
    results.reduce((acc, item) => {
      const testResult = acc.find(
        (el) => el.originalValue === item.correctValue
      );

      if (!testResult) {
        acc.push({
          translation: item.translation,
          originalValue: item.correctValue,
          mistakes: !item.isCorrect ? 1 : 0,
          answered: item.isCorrect ? 1 : 0,
        });
      } else {
        testResult.mistakes = !item.isCorrect
          ? (testResult as any).mistakes + 1
          : testResult.mistakes;
        testResult.answered = item.isCorrect
          ? (testResult as any).answered + 1
          : testResult.answered;
      }

      return acc;
    }, testResults);

    this.dataSource = new MatTableDataSource<TestResult>(testResults);
  }

  displayedColumns: string[] = [
    'originalValue',
    'translation',
    'mistakes',
    'answered',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
