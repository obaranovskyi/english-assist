import { Component } from '@angular/core';

import { WordModel } from '../shared/models';

import { WordsService } from '../shared/words.service';

@Component({
  selector: 'ea-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent {
  constructor(public readonly wordsService: WordsService) {}

  wordToUpdate: WordModel | undefined;

  removeWord(word: WordModel) {
    this.wordsService.removeWord(word);
  }

  hideUpdateForm() {
    this.wordToUpdate = undefined;
  }

  showUpdateForm(word: WordModel) {
    this.wordToUpdate = word;
  }

  cleanAllWords() {
    this.wordsService.cleanAllWords();
  }
}
