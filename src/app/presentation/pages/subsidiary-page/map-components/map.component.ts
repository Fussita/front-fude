import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import * as L from "leaflet";
import { LocationType } from "../types/location.type";
import { v4 as uuidv4 } from 'uuid';
import { InfoLocationType } from "../types/info-location.type";

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;
  private marker!: L.Marker
  mapId: string = uuidv4()
  @Input() locations: Array<InfoLocationType> = [];
  @Input() enableClickEvent: boolean = false;
  @Output() locationSelected = new EventEmitter<{ coords: L.LatLng; city: string; state: string }>();
  @Input() dragging: boolean = false;
  @Input() zoomControl: boolean = true;
  @Input() scrollWheelZoom: boolean = false;
  @Input() doubleClickZoom: boolean = false;
  @Input() touchZoom: boolean = false;
  @Input() zoom: number = 15;
  @Input() viewOnly: boolean = false;

  ngAfterViewInit(): void {
    this.map = L.map('map-' + this.mapId, {
      dragging: this.dragging,
      zoomControl: this.zoomControl,
      scrollWheelZoom: this.scrollWheelZoom,
      doubleClickZoom: this.doubleClickZoom,
      touchZoom: this.touchZoom,
    }).setView(new L.LatLng(6.42375, -66.58973), this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.locations.forEach(location => {

      this.marker = L.marker(new L.LatLng(location.location.latitude, location.location.longitude)).addTo(this.map);
      if (!this.viewOnly) {
        this.marker.bindPopup(`
          <div>
            <p style="margin: 0;"><strong>Nombre:</strong> ${location.name}</p>

            <div>
              <p style="margin: 0;"><strong>Emails:</strong></p>
              <ul style="margin-left: 40px;">
                ${location.emails.map(email => `<li>${email}</li>`).join('')}
              </ul>
            </div>

            <div>
              <p style="margin: 0;"><strong>Teléfonos:</strong></p>
              <ul style="margin-left: 40px;">
                ${location.telefonos.map(telefono => `<li>${telefono}</li>`).join('')}
              </ul>
            </div>

            <p style="margin: 0;"><strong>Estado:</strong> ${location.status}</p>
            <p style="margin: 0;"><strong>Fecha de Creación:</strong> ${location.creationDate.toISOString().split('T')[0]}</p>

            <div>
              <p style="margin: 0;"><strong>Ubicación:</strong></p>
              <ul style="margin-left: 40px;">
                <li><strong>Ciudad:</strong> ${location.location.cityName}</li>
                <li><strong>Estado:</strong> ${location.location.stateName}</li>
                <li><strong>Longitud:</strong> ${location.location.longitude}</li>
                <li><strong>Latitud:</strong> ${location.location.latitude}</li>
              </ul>
            </div>
          </div>
        `);
      } else {
        this.map.setView(new L.LatLng(location.location.latitude, location.location.longitude), this.zoom);
      }
    });

    if (this.enableClickEvent) {
      this.map.on('click', (e: L.LeafletMouseEvent) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        this.reverseGeocode(lat, lng);

        if (this.marker) {
          this.marker.setLatLng([lat, lng]);
        } else {
          this.marker = L.marker([lat, lng]).addTo(this.map);
        }

      });
    }

  }

  private reverseGeocode(lat: number, lng: number): void {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        const city = data.address.city || 'No disponible';
        const state = data.address.state || 'No disponible';
        const coords = L.latLng(lat, lng);
        this.locationSelected.emit({ coords, city, state });
      })
      .catch(error => console.error('Error en la geocodificación inversa:', error));
  }


  goLocation(latitude: number, longitude: number): void {
    this.map.setView(new L.LatLng(latitude, longitude), 15);
  }

}

