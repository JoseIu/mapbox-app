import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
interface MenuItem {
  icon: string;
  route: string;
  name: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    {
      icon: 'assets/images/alone.svg',
      route: '/alone',
      name: 'Standalone',
    },
  ];
}
