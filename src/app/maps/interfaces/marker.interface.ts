import { Marker } from 'mapbox-gl';

export interface MarkerAndColor {
  color: string;
  marker: Marker;
}

export interface PlainMarker {
  color: string;
  lngLat: number[];
}
