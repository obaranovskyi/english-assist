import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { NOTIFICATION_CONFIG } from '../../constants';
import { WordModel } from '../../models';
import { WordsService } from '../../words.service';

@Component({
  selector: 'ea-update-word',
  templateUrl: './update-word.component.html',
  styleUrls: ['./update-word.component.scss'],
})
export class UpdateWordComponent {
  panelOpenState = true;

  originalValue: string = '';
  translation: string = '';

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() hideForm: EventEmitter<void> = new EventEmitter<void>();

  _wordToUpdate!: WordModel;
  @Input()
  set wordToUpdate(value: WordModel) {
    this._wordToUpdate = value;
    this.translation = value.translation;
    this.originalValue = value.originalValue;
  }
  get wordToUpdate() {
    return this._wordToUpdate;
  }

  constructor(
    private _snackBar: MatSnackBar,
    public readonly wordService: WordsService
  ) {}

  update() {
    this.wordService.updateWord({
      ...this.wordToUpdate,
      ...{ translation: this.translation, originalValue: this.originalValue },
    });
    this.panelOpenState = false;
    this._snackBar.open(
      `You've updated the word ${this.originalValue}.`,
      'OK',
      NOTIFICATION_CONFIG
    );
    this.hideForm.emit();
  }
}
