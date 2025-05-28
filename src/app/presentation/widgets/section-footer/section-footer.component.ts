import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'section-footer',
  standalone: true,
  imports: [],
  templateUrl: './section-footer.component.html',
  styleUrl: './section-footer.component.scss'
})
export class SectionFooterComponent {

    router = inject(Router)
    showMenu = false
  
    goWhere(route: string) {
      this.router.navigateByUrl(route)
    }
  
}
