import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { AllDogsService } from '../Services/allDogs.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService, AllDogsService,
    importProvidersFrom(HttpClientModule)]
};