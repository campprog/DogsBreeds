import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterLink, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { AllDogsService } from '../Services/allDogs.service';
import { UserServices } from '../Services/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService, AllDogsService, UserServices, RouterLink,
    importProvidersFrom(HttpClientModule)]
};