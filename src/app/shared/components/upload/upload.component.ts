import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { NOTIFICATION_CONFIG } from '../../constants';
import { WordsService } from '../../words.service';

@Component({
  selector: 'ea-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  panelOpenState = false;
  words: string = '';
  placeholder = `[{ "originalValue": "text", "translation": "текст", "wordId": 1 }]`

  constructor(
    public readonly wordsService: WordsService,
    private _snackBar: MatSnackBar
  ) {}

  get isJsonValid() {
    let isValid;
    try {
      isValid = JSON.parse(this.words);
    } catch (err) {
      isValid = false;
    }
    return isValid;
  }

  upload() {
    this.wordsService.setWords(JSON.parse(this.words));
    this.panelOpenState = false;
    this.words = '';

    this._snackBar.open(
      "You've added new words now you can start training.",
      'OK',
      NOTIFICATION_CONFIG
    );
  }
}
