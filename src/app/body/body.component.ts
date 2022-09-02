import { Component, Input } from '@angular/core';

// interface SideNavToggle {
//   screenWidth: number;
//   collapsed: boolean;
// }

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  title = 'sidenav';

  isSideNavCollapsed = false;

  
  SideNavToggle = {
    screenWidth: 0,
    collapsed: false
  }
  onToggleSideNav(event:any): void {
    this.SideNavToggle.screenWidth = event.screenWidth;
    this.SideNavToggle.collapsed = event.collapsed;


  }
  
  

  

  // @Input() collapsed = false;
  // @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';

    if(this.SideNavToggle.collapsed === false) {
      styleClass = 'body-md-screen';
    } else  {
      styleClass = 'body-trimmed';
      
    }
    return styleClass;
  }
}
