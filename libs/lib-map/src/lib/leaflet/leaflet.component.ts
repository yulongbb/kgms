import { Component } from '@angular/core';

import {
  circle,
  geoJSON,
  icon,
  latLng,
  Layer,
  marker,
  polygon,
  tileLayer,
} from 'leaflet';

@Component({
  selector: 'kgms-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css'],
})
export class LeafletComponent {
  
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: latLng(39.879966, 116.726909),
  };
  layers = [
    // circle([46.95, -116], { radius: 5000 }),
    // polygon([
    //   [46.8, 121.85],
    //   [46.92, 121.92],
    //   [46.87, 121.8],
    // ]),
    marker([39.879966, 116.726909], {
      icon: icon({
        iconSize: [25, 25],
        iconAnchor: [13, 41],
        iconUrl: 'assets/images/aircraft_blue.png',
        iconRetinaUrl: 'assets/images/aircraft_blue.png',
      }),
    }),
  ];
}
