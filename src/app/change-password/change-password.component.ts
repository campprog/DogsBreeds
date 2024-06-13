import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { UserServices } from '../../Services/user.service';
import { User } from '../../Models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  actualPassword: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService, private userService: UserServices, private router: Router) { }

  changePassword() {
    if (this.actualPassword == this.newPassword) {
      alert('actual and new password can not be the same')
    }
    else {


      if (this.authService.userLogged.password == this.actualPassword) {

        this.authService.userLogged.password = this.newPassword;
        this.userService.changePassword(this.authService.userLogged).subscribe({
          next: (response) => {
            this.authService.userLogged = response;
            this.router.navigate(['/']);
          }
        })
      }
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}


