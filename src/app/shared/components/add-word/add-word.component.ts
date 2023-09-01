import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { NOTIFICATION_CONFIG } from '../../constants';
import { WordsService } from '../../words.service';

@Component({
  selector: 'ea-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss'],
})
export class AddWordComponent {
  panelOpenState = false;

  originalValue: string = '';
  translation: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    public readonly wordService: WordsService
  ) {}

  add() {
    this.wordService.addWord({
      translation: this.translation,
      originalValue: this.originalValue,
      wordId: (window['crypto'] as any).randomUUID(),
    });

    this.panelOpenState = false;
    this._snackBar.open(
      `You've added new word ${this.originalValue}.`,
      'OK',
      NOTIFICATION_CONFIG
    );
    this.translation = '';
    this.originalValue = '';
  }

  cancel() {
    this.panelOpenState = false;
  }
}
