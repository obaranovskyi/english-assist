import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { WordsService } from '../../words.service';
import { MENU_ITEMS } from './constants';
import { MenuModel } from './models';


@Component({
  selector: 'ea-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems: MenuModel[] = MENU_ITEMS;

  constructor(
    public readonly wordsService: WordsService,
    private readonly router: Router
  ) {}

  isActive(wordsLength: number, path: string): boolean {
    if (path === 'test') return Boolean(wordsLength);

    return true;
  }

  isUnderline(menuItem: MenuModel): boolean {

    return Boolean(menuItem.isDisabled || `/${menuItem.path}` !== this.router.url);
  }
}
