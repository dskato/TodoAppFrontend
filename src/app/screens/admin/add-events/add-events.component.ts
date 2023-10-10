import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Map, latLng, tileLayer, Marker, icon } from 'leaflet';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  switchMap,
} from 'rxjs';
import { BingProvider } from 'leaflet-geosearch';
import { environment } from 'src/environments/environment.development';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css'],
})
export class AddEventsComponent implements OnInit {
  addEventForm!: FormGroup;
  title = 'Angular Open Maps - TodoApp';
  provider = new BingProvider({
    params: {
      key: environment.BingApiKey,
    },
  });
  mapQueryList!: any;
  @ViewChild('mapsearchTp') mapsearchTp!: ElementRef<HTMLInputElement>;

  vvMapInitialized: boolean = false;
  options!: any;
  map!: Map;
  currentMarker: Marker | null = null;
  selectedLat: any;
  selectedLon: any;
  typeahedText: string = '';
  dsblRepInpt = false;
  selectedAddress!: any;

  userLat!: any;
  userLon!: any;

  constructor(private formBuilder: FormBuilder) {
    this.addEventForm = this.formBuilder.group({
      ename: ['', [Validators.required]],
      edate: ['', [Validators.required]],
      edesc: [''],
    });
  }

  ngAfterViewInit() {
    fromEvent(this.mapsearchTp.nativeElement, 'input')
      .pipe(
        debounceTime(200),
        map((event: Event) => (event.target as HTMLInputElement).value),
        distinctUntilChanged()
      )
      .subscribe((text) => {
        //Map the text searched with the list
        this.provider.search({ query: text }).then((result) => {
          this.mapQueryList = result;
        });
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

  onSelectedAddress(selectedItem: NgbTypeaheadSelectItemEvent<any>) {
    this.selectedAddress = this.mapQueryList.find(
      (e: { label: any }) => e.label == selectedItem.item
    );
    console.log(this.selectedAddress);
    this.dsblRepInpt = true;
    const latitude = this.selectedAddress.raw.point.coordinates[0];
    const longitude = this.selectedAddress.raw.point.coordinates[1];
    if (this.map) {
      this.map.panTo([latitude, longitude]);
    }
  }

  clearSelectedAddress() {
    if (this.mapsearchTp) {
      this.mapsearchTp.nativeElement.value = '';
    }
    this.mapQueryList = [];
    this.selectedAddress = null;
    this.dsblRepInpt = false;
    if (this.map) {
      this.map.panTo([this.userLat, this.userLon]);
    }
  }


  clearMarkers(){
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
      this.currentMarker = null;
    }
  }

  getUserCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.vvMapInitialized = true;
          this.initalizeMap(
            position.coords.latitude,
            position.coords.longitude
          );
          this.initUserPosition(
            position.coords.latitude,
            position.coords.longitude
          );
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

  initUserPosition(lat: any, lon: any) {
    this.userLat = lat;
    this.userLon = lon;
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

  //Typeahead config

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term) => {
        if (term === '' || !this.mapQueryList) {
          return [];
        }

        const filteredResults = this.mapQueryList
          .filter((v: { label: string }) =>
            v.label.toLowerCase().indexOf(term.toLowerCase())
          )
          .map((a: { label: any }) => a.label);

        return of(filteredResults);
      })
    );

  formatter = (result: string) => result;
}

export const customIcon = icon({
  iconSize: [25, 41],
  iconAnchor: [13, 0],
  iconUrl: 'assets/icons/map-marker.svg',
});
