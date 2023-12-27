import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss'],
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('miniMap') public map?: ElementRef;

  public mapEvents?: Map;

  @Input() lngLatRef?: number[];

  ngAfterViewInit(): void {
    if (!this.map) throw 'Map div not found';
    if (!this.lngLatRef) throw 'LngLat can`t be null';

    const [lng, lat] = this.lngLatRef;
    const coord = new LngLat(lng, lat);

    this.mapEvents = new Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: coord,
      zoom: 15,
      interactive: false,
    });

    this.addMarker(coord);
  }

  public addMarker(lngLat: LngLat) {
    if (!this.mapEvents) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const customMarker = document.createElement('div');
    customMarker.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="30" viewBox="0 0 16 16">
       <path fill="${color}" fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
    </svg>
    `;

    new Marker({
      element: customMarker,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.mapEvents);
  }
}
