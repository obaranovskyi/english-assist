import { Component } from '@angular/core';

import { WordsService } from '../shared/words.service';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  constructor(public readonly wordsService: WordsService) {}

}
