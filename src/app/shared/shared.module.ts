import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GridComponent } from './components/grid/grid.component';
import { MenuComponent } from './components/menu/menu.component';
import { UploadComponent } from './components/upload/upload.component';
import { CacheGridComponent } from './components/cache-grid/cache-grid.component';
import { TestComponent } from './components/test/test.component';
import { AddCacheComponent } from './components/add-cache/add-cache.component';
import { ValueDialogComponent } from './components/value-dialog/value-dialog.component';
import { UpdateWordComponent } from './components/update-word/update-word.component';
import { AddWordComponent } from './components/add-word/add-word.component';
import { ResultGridComponent } from './components/result-grid/result-grid.component';

const declarationsAndExports = [
  MenuComponent,
  GridComponent,
  UploadComponent,
  CacheGridComponent,
  AddCacheComponent,
  TestComponent,
  ValueDialogComponent,
  UpdateWordComponent,
  AddWordComponent,
  ResultGridComponent,
];

@NgModule({
  declarations: [...declarationsAndExports],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatBadgeModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [...declarationsAndExports],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}
