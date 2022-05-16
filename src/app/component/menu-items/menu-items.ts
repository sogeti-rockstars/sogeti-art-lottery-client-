import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  isAdmin: boolean;
}

const MENUITEMS = [
  { state: 'artitems', name: 'Norrkonst 2021', type: 'link', icon: '', isAdmin: false },
  { state: 'association', name: 'Norrkonst 2020', type: 'link', icon: '', isAdmin: false},
  { state: 'artitems', name: 'Norrkonst 2019', type: 'link', icon: '', isAdmin: false },
  { state: 'artitems', name: 'Norrkonst 2018', type: 'link', icon: '', isAdmin: false },
  { state: 'artitems', name: 'Sydkonst 2021', type: 'link', icon: '', isAdmin: false },
  { state: 'artitems', name: 'Sydkonst 2020', type: 'link', icon: '', isAdmin: false },
  { state: 'artitems', name: 'Nytt lotteri', type: 'link', icon: '', isAdmin: true },
];

@Injectable()
export class MenuItems {

  getMenuitem(): Menu[] {
      return MENUITEMS;
  }
}