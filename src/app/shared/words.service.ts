import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { WordModel } from './models';

@Injectable()
export class WordsService {
  private readonly wordsBhvSubj: BehaviorSubject<
    WordModel[]
  > = new BehaviorSubject([] as WordModel[]);
  words$ = this.wordsBhvSubj.asObservable();

  setWords(words: WordModel[]) {
    this.wordsBhvSubj.next(words);
  }

  getWords() {
    return this.wordsBhvSubj.getValue();
  }

  removeWord(wordToRemove: WordModel) {
    this.setWords(
      this.getWords().filter(
        (word) => word.originalValue !== wordToRemove.originalValue
      )
    );
  }

  updateWord(wordToUpdate: WordModel) {
    this.setWords(
      this.getWords().map((word) => {
        return word.wordId === wordToUpdate.wordId ? wordToUpdate : word;
      })
    );
  }

  addWord(wordToAdd: WordModel) {
    this.setWords([wordToAdd, ...this.getWords()]);
  }

  cleanAllWords() {
    this.setWords([]);
  }
}
