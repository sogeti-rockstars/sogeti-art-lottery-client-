import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'artitems', name: 'Norrkonst 2021', type: 'link', icon: '' },
  { state: 'artitems', name: 'Norrkonst 2020', type: 'link', icon: '' },
  { state: 'artitems', name: 'Norrkonst 2019', type: 'link', icon: '' },
  { state: 'artitems', name: 'Norrkonst 2018', type: 'link', icon: '' },
  { state: 'artitems', name: 'Sydkonst 2021', type: 'link', icon: '' },
  { state: 'artitems', name: 'Sydkonst 2020', type: 'link', icon: '' },
  { state: 'artitems', name: 'Nytt lotteri', type: 'link', icon: '' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}