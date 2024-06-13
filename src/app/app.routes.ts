import { Routes } from '@angular/router';
import { AllDogsComponent } from './all-dogs/all-dogs.component';
import { authGuard } from '../auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DogRaceComponent } from './dog-race/dog-race.component';
import { UserLikesComponent } from './user-likes/user-likes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
    {
        path: '',
        component: AllDogsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'dogRace/:id',
        component: DogRaceComponent,
        canActivate: [authGuard]
    },
    {
        path: 'userLikes',
        component: UserLikesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'changePassword',
        component: ChangePasswordComponent,
        canActivate: [authGuard]
    }
];
