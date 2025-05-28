import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'tab-page',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './tab-page.component.html',
  styleUrl: './tab-page.component.scss'
})
export class TabPageComponent {

  router = inject(Router)

  goWhere(route: string) {
    this.router.navigateByUrl(route)
  }


}
