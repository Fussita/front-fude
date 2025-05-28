import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-comp',
  standalone: true,
  imports: [],
  templateUrl: './header-comp.component.html',
  styleUrl: './header-comp.component.scss'
})
export class HeaderCompComponent {

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
