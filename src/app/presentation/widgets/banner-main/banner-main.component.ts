import { NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'banner-main',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './banner-main.component.html',
  styleUrl: './banner-main.component.scss'
})
export class BannerComponent {

  router = inject(Router)
  showMenu = false

  scrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = scrollTop > 0; // Puedes ajustar este umbral
  }

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
