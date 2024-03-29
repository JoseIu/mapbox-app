import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

// import { environment } from 'src/environments/environments';
import { enviroment } from 'src/environments/environments';

import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';
(mapboxgl as any).accessToken = enviroment.mapbox_key;

@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomPageComponent,
  ],
  imports: [CommonModule, MapsRoutingModule, SideMenuComponent],
})
export class MapsModule {}
