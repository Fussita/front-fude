import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Result } from '../../../_core/_utils/result';
import { HttpClientModule } from '@angular/common/http';
import { Institution } from '../../../_core/models/institution.interface';
import { FindManyInstitution } from '../../../_core/service/institution/find/find-institution';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'section-alliance',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './section-alliance.component.html',
  styleUrl: './section-alliance.component.scss'
})
export class SectionAllianceComponent implements OnInit {

  insti: Institution[] = []
  images: string[] = []
  private scrollPos = 0
  findInsti = new FindManyInstitution()
  @ViewChild('carousel', { static: false }) carouselRef!: ElementRef;

  ngOnInit(): void {
    this.findInsti.execute({ page: 0, perPage: 20 }).subscribe({
      next: (e: Result<Institution[]>) => {
        if ( !e.IsError() ) {
          this.insti = e.getValue()
          this.insti.forEach( e => this.images.push(e.image))
        }
      }
    })
  }
  
  get duplicatedImages() {
    return [...this.images, ...this.images, ...this.images];
  }

  ngAfterViewInit(): void {
    this.scrollLoop();
  }
  
  scrollLoop() {
    const el = this.carouselRef.nativeElement;
    this.scrollPos += 1;
    if (this.scrollPos >= el.scrollWidth / 2) {
      el.scrollLeft = 0;
      this.scrollPos = 1;
    } else el.scrollLeft = this.scrollPos; 
    requestAnimationFrame(() => this.scrollLoop());
  }

}
