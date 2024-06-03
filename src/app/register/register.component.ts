import { Component } from '@angular/core';
import { User } from '../../Models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

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
    this.AuthService.register(this.user).subscribe({
      next: (user) => {

        this.router.navigate(['/login']);
      }
    })
  }

}
