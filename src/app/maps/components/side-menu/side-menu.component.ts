import { Component } from '@angular/core';
interface MenuItem {
  icon: string;
  route: string;
  name: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {
      icon: 'assets/images/fullscreen.svg',
      route: '/maps/fullscreen',
      name: 'FullScreen',
    },
    {
      icon: 'assets/images/zoom.svg',
      route: '/maps/zoom-page',
      name: 'Zoom Range',
    },
    {
      icon: 'assets/images/marker.svg',
      route: '/maps/markers',
      name: 'Markers',
    },
    {
      icon: 'assets/images/house.svg',
      route: '/maps/properties',
      name: 'Houses',
    },
  ];
}
