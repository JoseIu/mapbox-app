import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.scss'],
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') public map?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.map) throw 'Elemento HTML no encontrado';

    const map = new Map({
      container: this.map.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/dark-v11', // style URL
      center: [-3.74922, 40.463667], // starting position [lng, lat]
      zoom: 5.5, // starting zoom
    });
  }
}
