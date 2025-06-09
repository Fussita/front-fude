import { Component } from '@angular/core';
import { SectionAboutUsComponent } from '../../widgets/section-about-us/section-about-us.component';
import { SectionFooterComponent } from '../../widgets/section-footer/section-footer.component';
import { SectionActivitiesComponent } from '../../widgets/section-activities/section-activities.component';
import { SectionAllianceComponent } from '../../widgets/section-alliance/section-alliance.component';
import { SectionVisionComponent } from '../../widgets/section-vision/section-vision.component';
import { HeaderSimpleComponent } from "../../widgets/header-simple/header-simple.component";
import { BannerComponent } from '../../widgets/banner-main/banner-main.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderSimpleComponent,
    BannerComponent,
    SectionAboutUsComponent,
    SectionFooterComponent,
    SectionActivitiesComponent,
    SectionAllianceComponent,
    SectionVisionComponent,
    HeaderSimpleComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
