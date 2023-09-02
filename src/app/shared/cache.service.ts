import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';

import { CacheModel, WordModel } from './models';
import { WordsService } from './words.service';

@Injectable()
export class CacheService {
  private readonly cacheRplSubj: ReplaySubject<
    CacheModel[]
  > = new ReplaySubject(1);
  cache$ = this.cacheRplSubj.asObservable();

  constructor(public readonly wordsService: WordsService) {
    this.reloadCache();
  }

  addCurrentToCache(name: string) {
    const cache: CacheModel = {
      name,
      value: JSON.stringify(this.wordsService.getWords()),
      date: Date.now(),
    };

    localStorage.setItem(name, JSON.stringify(cache));
    this.reloadCache();
  }

  reloadCache() {
    const rawValues = this.allValues();
    const caches = rawValues
    .map(element => JSON.parse(element))
    .filter((wordGroup: object[]) => 'name' in wordGroup)
    .map(wordGroup => {
      return {
        name: wordGroup.name,
        value: wordGroup.value,
        date: Number(wordGroup.date),
      };
    });

    this.setCache(caches);
  }

  removeCacheByName(name: string) {
    localStorage.removeItem(name);
    this.reloadCache();
  }

  mergeAll() {
    const rawValues = this.allValues();
    const caches = rawValues.map((element) => {
      const parsedCache = JSON.parse(element);
      return {
        name: parsedCache.name,
        value: parsedCache.value,
        date: Number(parsedCache.date),
      };
    });

    const allWords: WordModel[] = [];
    caches.forEach((cache) => {
      allWords.push(...JSON.parse(cache.value));
    });

    const date = new Date();
    const dateName = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const name = `global_merge_${dateName}`;
    const stringValue = JSON.stringify({
      name,
      value: JSON.stringify(allWords),
      date: Date.now(),
    });

    localStorage.setItem(name, stringValue);
    this.reloadCache();
  }

  private allValues() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values as string[];
  }

  private setCache(cache: CacheModel[]) {
    this.cacheRplSubj.next(cache);
  }
}
