import { Component, EventEmitter, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AllDogsService } from '../../Services/allDogs.service';
import { Dog } from '../../Models/dog.model';
import { AllDogsComponent } from '../all-dogs/all-dogs.component';
import { User } from '../../Models/user.model';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, CommonModule, FormsModule, AllDogsComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output()
  clickEvent = new EventEmitter<void>()

  showButtons: boolean = false;
  constructor(private router: Router, private authService: AuthService) { }
  user: User = this.authService.userLogged;
  sendClick() {
    this.clickEvent.emit();
    this.router.navigate(['/']);

  }

  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.authService.logout();
  }

  deleteAccount() {
    this.authService.deleteAccount(this.authService.userLogged).subscribe({
      next: (response) => {
        alert(`Account was Deleted`);

      }
    })
    this.router.navigate(['/login']);
  }


}

