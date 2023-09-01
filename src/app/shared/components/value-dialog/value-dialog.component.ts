import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ValueModel {
  value: string;
}

@Component({
  selector: 'ea-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.scss'],
})
export class ValueDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ValueModel) {}

  copy() {
    const el = document.createElement('textarea');
    el.value = this.data.value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
