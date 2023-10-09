import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Map, latLng, tileLayer, Marker, icon } from 'leaflet';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css'],
})
export class AddEventsComponent implements OnInit {
  addEventForm!: FormGroup;
  title = 'Angular Open Maps - TodoApp';

  vvMapInitialized: boolean = false;
  options!: any;
  map!: Map;
  currentMarker: Marker | null = null;
  selectedLat: any;
  selectedLon: any;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {
    this.addEventForm = this.formBuilder.group({
      ename: ['', [Validators.required]],
      edate: ['', [Validators.required]],
      edesc: [''],
    });
  }
  ngOnInit(): void {
    this.getUserCurrentLocation();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.getUserCurrentLocation();

    //When user clicks get the lat and long
    map.on('click', (e) => {


      //Allow only 1 marker
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }
      const marker = new Marker([e.latlng.lat, e.latlng.lng], {
        icon: customIcon,
      });
      marker.addTo(this.map);
      this.currentMarker = marker;
    });
  }

  getUserCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.vvMapInitialized = true;
          this.initalizeMap(latitude, longitude);
        },
        (error) => {
          console.log(error);
        },
        { maximumAge: 0, timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      console.log('No support for geolocation');
    }
  }

  initalizeMap(latitude: any, longitude: any) {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }),
      ],
      zoom: 16,
      center: latLng(latitude, longitude),
    };
  }
}

export const customIcon = icon({
  iconSize: [25, 41],
  iconAnchor: [13, 0],
  iconUrl: 'assets/icons/map-marker.svg',
});
