import { Component, Input } from '@angular/core';

import { WordModel } from '../../models';
import { PreviousResult } from './models';

@Component({
  selector: 'ea-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  configPanelOpenState: boolean = false;
  _words: WordModel[] = [];

  numberOfCorrectAnswersPerWord: number = 5;
  currentWord!: WordModel | undefined;
  _currentTestWords: WordModel[] = [];
  get currentTestWords() {
    return this._currentTestWords.filter((testWord) => {
      return (
        (testWord.successCount || 0) !== this.numberOfCorrectAnswersPerWord
      );
    });
  }

  set currentTestWords(value: WordModel[]) {
    this._currentTestWords = value;
  }

  currentTest: number = 1;
  numberOfTests: number = 1;
  tests: number[] = [1];
  enteredValue: string = '';

  previousResults: PreviousResult[] = [];

  @Input() numberOfWordsPerPage: number = 5;

  @Input()
  set words(value: WordModel[]) {
    this._words = value;
    this.reloadTest();
  }

  get words() {
    return this._words;
  }

  checkEnteredValue(e: any) {
    if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
      const enteredValue = e.target.value;
      const isCorrectAnswer = this.compareAnswer(enteredValue);

      this.handleAnswer(isCorrectAnswer, enteredValue);
    }
  }

  handleAnswer(isCorrectAnswer: boolean, enteredValue: string = '') {
    const previousResult: PreviousResult = {
      translation: this.currentWord?.translation as string,
      isCorrect: isCorrectAnswer,
      enteredValue: enteredValue,
      correctValue: this.currentWord?.originalValue as string,
    };

    this.previousResults.push(previousResult);

    if (isCorrectAnswer) this.swapWordUsingSuccessAnswer();
    else this.swapWordUsingErrorAnswer();

    this.enteredValue = '';
  }

  handleDefaultSuccess() {
    this.handleAnswer(true, this.currentWord?.originalValue);
  }

  handleDefaultError() {
    this.handleAnswer(false);
  }

  swapWordUsingSuccessAnswer(): void {
    if (!this.currentWord) return;

    this.currentWord.successCount = (this.currentWord.successCount || 0) + 1;

    if (
      (this.currentWord.successCount || 0) <= this.numberOfCorrectAnswersPerWord
    )
      this.currentTestWords = [
        ...this.currentTestWords,
        this.currentWord as WordModel,
      ];

    this.currentWord = this._currentTestWords.shift();
  }

  swapWordUsingErrorAnswer(): void {
    this._currentTestWords.splice(
      Math.ceil((this.currentTestWords.length + 1) / 2),
      0,
      this.currentWord as WordModel
    );
    this.currentWord = this._currentTestWords.shift();
  }

  reloadTest(resetTestNumber: boolean = false) {
    if (resetTestNumber) this.currentTest = 1;

    this.numberOfTests = this.calcPageCount(
      this.words,
      this.numberOfWordsPerPage
    );

    this.tests = Array.from({ length: this.numberOfTests }).map(
      (value, index) => index + 1
    );

    if (this.words.length <= this.numberOfWordsPerPage) {
      this.currentTestWords = this.words.slice().map((el) => ({ ...el }));
    } else if (this.currentTest === 1) {
      this.currentTestWords = this.words
        .slice(0, this.numberOfWordsPerPage)
        .map((el) => ({ ...el }));
    } else {
      this.currentTestWords = this.words
        .slice(
          (this.currentTest - 1) * this.numberOfWordsPerPage,
          this.currentTest * this.numberOfWordsPerPage
        )
        .map((element) => ({ ...element }));
    }

    this.currentWord = this._currentTestWords.shift();

    this.previousResults.length = 0;
  }

  resetTest(): void {
    this.words = this._words;
  }

  calcPageCount(words: WordModel[], wordsPerPage: number) {
    const fullPages = Math.floor(words.length / wordsPerPage);
    const isRestMoreThanZero = Boolean(words.length % wordsPerPage);

    return fullPages + (isRestMoreThanZero ? 1 : 0);
  }

  isLastPageSelected(
    words: WordModel[],
    wordsPerPage: number,
    testNumber: number
  ) {
    return testNumber === this.calcPageCount(words, wordsPerPage);
  }

  compareAnswer(value: string = '') {
    return (
      this.currentWord?.originalValue.toLowerCase().trim().toLowerCase() ===
      value.toLowerCase().trim().toLowerCase()
    );
  }

  get lastPreviousResult() {
    return this.previousResults[this.previousResults.length - 1];
  }

  get successCount() {
    return this.previousResults.filter(
      (previousResponse) => previousResponse.isCorrect
    ).length;
  }

  get errorCount() {
    return this.previousResults.filter(
      (previousResponse) => !previousResponse.isCorrect
    ).length;
  }
}
