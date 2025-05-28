import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/_config/app.component';
import { appConfig } from './app/_config/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
