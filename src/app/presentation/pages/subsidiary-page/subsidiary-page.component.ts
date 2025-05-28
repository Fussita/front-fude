import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { HeaderSimpleComponent } from "../../widgets/header-simple/header-simple.component";
import { Router } from "@angular/router";
import { MapComponent } from "./map-components/map.component";
import { LocationType } from "./types/location.type";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { InfoLocationType } from "./types/info-location.type";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from "./popup-components/popup.component";


@Component({
  selector: 'app-subsidiary-page',
  standalone: true,
  imports: [
    HeaderSimpleComponent,
    MapComponent,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    PopupComponent
  ],
  templateUrl: './subsidiary-page.component.html',
  styleUrl: './subsidiary-page.component.scss'
})
export class SubsidiaryPageComponent implements OnInit {

  private apiUrl = 'https://api.example.com/endpoint';
  data: InfoLocationType[] = [];

  infoLocations: Array<LocationType> = [];

  router = inject(Router);
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  locationIcon = faMapMarkerAlt;

  constructor(private readonly http: HttpClient, private dialog: MatDialog) {}

  fetchData(): void {
    this.data = [
      {
        name: 'John Doe',
        emails: ['john.doe@example.com', 'john.secondary@example.com'],
        telefonos: ['+1234567890', '+0987654321'],
        status: 'Active',
        creationDate: new Date('2023-04-01'),
        location: {
          cityName: 'Ciudad Bolivar',
          stateName: 'Bolivar',
          longitude: -63.5553,
          latitude: 8.0945
        }
      },
      {
        name: 'Jane Smith',
        emails: ['jane.smith@example.com'],
        telefonos: ['+1122334455'],
        status: 'Inactive',
        creationDate: new Date('2023-03-20'),
        location: {
          cityName: 'Caracas',
          stateName: 'Miranda',
          longitude: -66.9036,
          latitude: 10.4880
        }
      },
      {
        name: 'Alan Turing',
        emails: ['alan.turing@example.com'],
        telefonos: ['+4433221100'],
        status: 'Active',
        creationDate: new Date('2023-02-15'),
        location: {
          cityName: 'London',
          stateName: 'England',
          longitude: -0.1276,
          latitude: 51.5074
        }
      }
    ];

    this.data.forEach((item) => {

      this.infoLocations.push({
        name: item.location.cityName,
        coords: [item.location.latitude, item.location.longitude]
      });
    });
  }

  getData(): Observable<InfoLocationType[]> {
    return this.http.get<InfoLocationType[]>(this.apiUrl);
  }

  openPopup(index: number): void {
    const infoLocation = this.data[index];
    this.dialog.open(PopupComponent, {
      width: '700px',
      height: '500px',
      disableClose: false,
      data: infoLocation,
      panelClass: 'custom-popup'
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  goWhere(route: string) {
    this.router.navigateByUrl(route);
  }

  goLocation(latitude: number, longitude: number, event: Event): void {
    event.stopPropagation();
    this.mapComponent.goLocation(latitude, longitude);
  }
}
