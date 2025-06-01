import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../admin-subsidiary-page/delete-popup-component/delete-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { Institution } from '../../../../_core/models/institution.interface';
import { Result } from '../../../../_core/_utils/result';
import { FindManyInstitution } from '../../../../_core/service/institution/find/find-institution';
import { DeleteInstitution } from '../../../../_core/service/institution/delete/delete-institution';
import { ToastBarService } from '../../../services/toast-bar/toast-bar.service';

@Component({
  selector: 'adm-institution-page',
  standalone: true,
  imports: [
    HttpClientModule
],
  templateUrl: './adm-institution-page.component.html',
  styleUrl: './adm-institution-page.component.scss'
})
export class AdmInstitutionPageComponent implements OnInit {

  insti: Institution[] = []
  textRandom = `Colaboramos activamente con diversas instituciones que comparten nuestra visión de construir un mundo más equitativo y solidario. Estas organizaciones, comprometidas con el bienestar social, participan aportando recursos, conocimientos y voluntariado. `
  private toast = inject(ToastBarService)
  router = inject(Router)
  
  goWhere(route: string) {
    this.router.navigateByUrl(route)
  }

  constructor(private dialog: MatDialog) {}

  openPopup( id: string ): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: { title: 'Eliminar Institución', desc: '¿Estas seguro de eliminar la Institucion?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.delElement(id)
      }
    })
  }

  ngOnInit(): void {
    this.findInsti.execute({ page: 0, perPage: 20 }).subscribe({
      next: (e: Result<Institution[]>) => {
        if ( !e.IsError() ) {
          this.insti = e.getValue()
        }
      }
    })
  }

  findInsti = new FindManyInstitution()      
  delInsti = new DeleteInstitution()

  delElement( id: string ) {
    this.delInsti.execute({ id: id }).subscribe({
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



}
