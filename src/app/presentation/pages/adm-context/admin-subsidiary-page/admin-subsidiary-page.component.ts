import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { PopupComponent } from "./delete-popup-component/delete-popup.component";
import { CommonModule } from "@angular/common";
import { HeaderSimpleComponent } from "../../../widgets/header-simple/header-simple.component";
import { MapComponent } from "../../subsidiary-page/map-components/map.component";
import { InfoLocationType } from "../../subsidiary-page/types/info-location.type";
import { LocationType } from "../../subsidiary-page/types/location.type";

@Component({
  selector: "app-admin-subsidiary",
  templateUrl: "./admin-subsidiary-page.component.html",
  styleUrl: "./admin-subsidiary-page.component.scss",
  standalone: true,
  imports: [
    CommonModule,
    HeaderSimpleComponent,
    HttpClientModule,
    MapComponent
  ],
  })
export class AdminSubsidiaryPageComponent implements OnInit {

  private apiUrl = 'https://api.example.com/endpoint';
    data: InfoLocationType[] = [];

    infoLocations: Array<LocationType> = [];

    router = inject(Router);

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

    ngOnInit(): void {
      this.fetchData();
    }

    goWhere(route: string) {
      this.router.navigateByUrl(route);
    }

    openPopup(): void {
      const dialogRef = this.dialog.open(PopupComponent, {
        width: '400px',
        data: { title: 'Eliminar Sucursal', desc: '¿Estas seguro de eliminar la Sucursal?' }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          console.log('Sucursal eliminada.');
          // Lógica de eliminación aquí
        } else {
          console.log('Eliminación cancelada.');
        }
      });
    }

}
