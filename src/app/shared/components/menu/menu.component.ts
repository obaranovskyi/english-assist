import { Component } from '@angular/core';

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

  constructor(public readonly wordsService: WordsService) {}
}
