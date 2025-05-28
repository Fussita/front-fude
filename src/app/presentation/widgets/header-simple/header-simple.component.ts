import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-simple',
  standalone: true,
  imports: [],
  templateUrl: './header-simple.component.html',
  styleUrl: './header-simple.component.scss'
})
export class HeaderSimpleComponent {

  router = inject(Router)

  goWhere(route: string) {
    this.router.navigateByUrl(route)
  }

}
