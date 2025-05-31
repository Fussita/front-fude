import { Component } from '@angular/core';
import { presentationTextB } from '../../../_core/constants/presentation-text';

@Component({
  selector: 'section-about-us',
  standalone: true,
  imports: [],
  templateUrl: './section-about-us.component.html',
  styleUrl: './section-about-us.component.scss'
})
export class SectionAboutUsComponent {

  textVA = `Promovemos el derecho que tiene toda persona a disfrutar de una vida digna y plena en igualdad de oportunidades`
  textVC = `Buscamos impactar positivamente en la integridad y profesionalismo de cada uno de nuestros miembros`
  textVB = `La humildad y el amor en la labor social son fundamentales, especialmente al apoyar a niños y niñas`
  
  
  
  
  presentationText = presentationTextB


  
}
