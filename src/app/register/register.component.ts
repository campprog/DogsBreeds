import { Component } from '@angular/core';
import { User } from '../../Models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { UserServices } from '../../Services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = { username: '', password: '', likes: [] };

  constructor(private AuthService: AuthService, private router: Router) { }


  register(): void {
    this.AuthService.allUsers().subscribe({
      next: (users: User[]) => {

        let userExists: Boolean = false;
        for (let i = 0; i < users.length; i++) {
          if (users[i].username === this.user.username) {
            userExists = true;
            break;
          }
        }
        if (userExists) {
          window.alert("Usuário já existente");
          return;
        }


        this.AuthService.register(this.user).subscribe({
          next: (user: User) => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error("Erro ao registrar usuário", err);
            window.alert("Erro ao registrar usuário");
          }
        });
      },
      error: (err) => {
        console.error("Erro ao buscar usuários", err);
        window.alert("Erro ao buscar usuários");
      }
    });
  }
}
