import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: null,
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'fas fa-home'
      },
      {
        state: 'users',
        name: 'Usuários',
        type: 'link',
        icon: 'fas fa-users'
      },
      {
        state: 'evaluations',
        name: 'Avaliações',
        type: 'link',
        icon: ' far fa-check-square'
      },
      {
        state: 'enviroments',
        name: 'Ambientes',
        type: 'link',
        icon: 'fas fa-map-marker-alt'
      },
      {
        state: 'questions',
        name: 'Perguntas',
        type: 'link',
        icon: 'fas fa-question'
      },
      {
        state: 'units',
        name: 'Unidades',
        type: 'link',
        icon: 'far fa-building'
      },
      {
        state: 'enviromentstype',
        name: 'Tipo de Ambiente',
        type: 'link',
        icon: 'fas fa-sitemap'
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
