import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastBarService {

  // position: top, bottom, center
  // icon: info, error, success
  shootToast( 
    tit: string,
    desc: string,
    pos: SweetAlertPosition,
    ico: SweetAlertIcon
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: pos,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    })
    
    Toast.fire({
      icon: ico,
      title: tit,
      text: desc,
      showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
      hideClass: { popup: `animate__animated animate__fadeOutDown animate__faster ` }
    })
  }

  constructor() { }
}
