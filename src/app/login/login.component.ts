import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../Models/user.model';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild("loginForm") form: NgForm;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (resultado: boolean) => {
        if (resultado == true) {
          this.router.navigate(['/'])
        }
        else {
          window.alert('Credenciais invalidas!');
        }
      },
      error: (erro) => { window.alert('Erro a efectuar o login') }

    })
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
