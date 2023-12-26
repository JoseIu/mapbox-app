import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
@Component({
  selector: 'app-zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.scss'],
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') public map?: ElementRef;

  public zoom: number = 6;
  public mapEvents?: Map;
  public currentLgLat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if (!this.map) throw 'Elemento HTML no encontrado';

    this.mapEvents = new Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: this.currentLgLat,
      zoom: this.zoom,
    });

    this.mapListeners();
  }
  ngOnDestroy(): void {
    //limipiamos lis listeners
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

  zoomin() {
    if (this.mapEvents!.getZoom() >= 18) return;
    this.mapEvents?.zoomIn();
  }
  zoomout() {
    if (this.mapEvents!.getZoom() <= 0) return;
    this.mapEvents?.zoomOut();
  }
}
