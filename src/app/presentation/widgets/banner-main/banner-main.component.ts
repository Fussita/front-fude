import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'banner-main',
  standalone: true,
  imports: [],
  templateUrl: './banner-main.component.html',
  styleUrl: './banner-main.component.scss'
})
export class BannerComponent {

  router = inject(Router)
  showMenu = false

  goWhere(route: string) {
    this.router.navigateByUrl(route)
  }

  showHiddenMenu() {
    const menu = document.getElementById('menu-hidden')
    if (menu && this.showMenu) {
      menu.style.display = 'none'
      this.showMenu = false
    } else if (menu && !this.showMenu) {
      menu.style.display = 'flex'
      this.showMenu = true 
    }



  }

}
