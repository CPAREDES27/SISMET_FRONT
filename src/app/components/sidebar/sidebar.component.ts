import { navbarFooter } from './nav-footer';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Bulletín',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/datos', title: 'Datos',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/mapa', title: 'Mapas',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/usuario', title: 'Usuarios',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/calculos', title: 'Cálculos',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/dashboard', title: '¿Que hay de nuevo?',  icon: 'ni-tv-2 text-primary', class: '' },
  /*{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  navFooter = navbarFooter;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}

