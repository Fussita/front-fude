import { Component } from '@angular/core';
import { HeaderCompComponent } from "../../widgets/header-comp/header-comp.component";
import { SectionAboutUsComponent } from '../../widgets/section-about-us/section-about-us.component';
import { SectionMissionComponent } from "../../widgets/section-mission/section-mission.component";
import { SectionFooterComponent } from '../../widgets/section-footer/section-footer.component';
import { SectionActivitiesComponent } from '../../widgets/section-activities/section-activities.component';
import { SectionAllianceComponent } from '../../widgets/section-alliance/section-alliance.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderCompComponent,
    SectionAboutUsComponent,
    SectionMissionComponent,
    SectionFooterComponent,
    SectionActivitiesComponent,
    SectionAllianceComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
