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

  constructor(private AuthService: AuthService, private userService: UserServices, private router: Router) { }


  register(): void {
    this.userService.allUsers().subscribe({
      next: (users: User[]) => {

        for (let i = 0; i < users.length; i++) {
          if (users[i].username === this.user.username) {

            window.alert("Usuário já existente");
            break;
          }
        }
        this.AuthService.register(this.user).subscribe({
          next: (user: User) => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            window.alert("Erro ao registrar ");
          }
        });
      },
      error: (err) => {
        window.alert("Erro getting usuários");
      }
    });
  }
}
