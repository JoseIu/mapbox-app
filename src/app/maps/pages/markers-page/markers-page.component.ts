import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarkerAndColor, PlainMarker } from '../../interfaces/marker.interface';

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.scss'],
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') public map?: ElementRef;
  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
  public mapEvents?: Map;
  public currentLgLat: LngLat = new LngLat(-3.7, 40.4);

  ngAfterViewInit(): void {
    if (!this.map) throw 'Elemento HTML no encontrado';

    this.mapEvents = new Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: this.currentLgLat,
      zoom: this.zoom,
    });
    this.mapListeners();

    this.readLocalStorage();
  }
  ngOnDestroy(): void {
    this.mapEvents?.remove();
  }
  public mapListeners() {
    if (!this.mapEvents) throw 'Mapa no inicializado';

    this.mapEvents.on('zoom', (ev) => {
      this.zoom = this.mapEvents!.getZoom();
    });
    this.mapEvents.on('move', () => {
      this.currentLgLat = this.mapEvents!.getCenter();
    });
  }

  public zoomin() {
    if (this.mapEvents!.getZoom() >= 18) return;
    this.mapEvents?.zoomIn();
  }
  public zoomout() {
    if (this.mapEvents!.getZoom() <= 0) return;
    this.mapEvents?.zoomOut();
  }

  public createMarker() {
    const lngLat = this.currentLgLat;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    console.log('COLOR', color);
    this.addMarker(lngLat, color);
  }

  public addMarker(lngLat: LngLat, color: string) {
    if (!this.mapEvents) return;

    const customMarker = document.createElement('div');
    customMarker.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="30" viewBox="0 0 16 16">
       <path fill="${color}" fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
    </svg>
    `;

    const marker = new Marker({
      element: customMarker,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.mapEvents);

    this.markers.push({ color, marker });

    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }
  public deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  public moveToMarker(marker: Marker) {
    this.mapEvents?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  public saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ color, marker }) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray(),
        };
      }
    );
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  public readLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';

    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coord = new LngLat(lng, lat);

      this.addMarker(coord, color);
    });
    console.log('MARKERS', this.markers);
  }
}
