import { Component, OnInit } from '@angular/core';
import { Alliance } from '../../../_core/models/alliance.interface';
import { EXALLIANCE } from '../../../_core/constants/static-data/alliance-data';
import { FindManyAlliance } from '../../../_core/service/alliance/find/find-alliance';
import { Result } from '../../../_core/_utils/result';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'section-alliance',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  templateUrl: './section-alliance.component.html',
  styleUrl: './section-alliance.component.scss'
})
export class SectionAllianceComponent {
  
  missionText = `Se basa en producir impactos positivos en la sociedad mediante acciones que afecten directamente en el bienestar y en el desarrollo de comunidades vulnerables. `
}
