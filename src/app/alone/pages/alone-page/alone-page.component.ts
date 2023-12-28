import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'alone-page',
  standalone: true,
  imports: [CommonModule, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.scss'],
})
export class AlonePageComponent {}
