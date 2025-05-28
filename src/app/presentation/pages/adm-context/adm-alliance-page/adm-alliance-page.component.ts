import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../admin-subsidiary-page/delete-popup-component/delete-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { EXALLIANCE } from '../../../../_core/constants/static-data/alliance-data';
import { Alliance } from '../../../../_core/models/alliance.interface';
import { HeaderSimpleComponent } from '../../../widgets/header-simple/header-simple.component';
import { FindManyAlliance } from '../../../../_core/service/alliance/find/find-alliance';
import { Result } from '../../../../_core/_utils/result';
import { DeleteAlliance } from '../../../../_core/service/alliance/delete/delete-alliance';
import { ToastBarService } from '../../../services/toast-bar/toast-bar.service';

@Component({
  selector: 'app-adm-alliance-page',
  standalone: true,
  imports: [
    HeaderSimpleComponent, 
    HttpClientModule
  ],
  providers: [
  ],
  templateUrl: './adm-alliance-page.component.html',
  styleUrl: './adm-alliance-page.component.scss'
})
export class AdmAlliancePageComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  insti: Alliance[] = []
  textRandom = `Colaboramos activamente con diversas instituciones que comparten nuestra visión de construir un mundo más equitativo y solidario. Estas organizaciones, comprometidas con el bienestar social, participan aportando recursos, conocimientos y voluntariado. Juntos trabajamos para impactar positivamente a comunidades en situación de vulnerabilidad. Valoramos profundamente estas alianzas, ya que son clave para alcanzar nuestros objetivos y multiplicar el alcance de nuestras acciones.`

  router = inject(Router)
  
  goWhere(route: string) {
    this.router.navigateByUrl(route)
  }

  openPopup(id: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: { title: 'Eliminar Alianza', desc: '¿Estas seguro de eliminar la Alianza?' }
  });
  
  dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.delElement( id )
    } else {
      }
    })
  }
  
  ngOnInit(): void {
    this.findAlli.execute({ page: 0, perPage: 20 }).subscribe({
      next: (e: Result<Alliance[]>) => {
        if ( !e.IsError() ) {
          this.insti = e.getValue()
        }
      }
    })
  }
  
  delElement( id: string ) {
    this.delAlli.execute({ id: id }).subscribe({
      next: (e) => {
        if (e.IsError()) {
          this.toast.shootToast( 'Proceso Fallido', e.getError().message, 'top', 'error' )
        } else {
          this.toast.shootToast( 'Borrado Exitoso', '', 'top', 'success' )
          this.insti = this.insti.filter( e => e.id !== id ) 
        }
      }
    })
  }

  findAlli = new FindManyAlliance()      
  delAlli = new DeleteAlliance()
  private toast = inject(ToastBarService)

}

