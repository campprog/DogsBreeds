import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menu: number = 0;

  escolherMenu(menuEscolhido: number) {
    this.menu = menuEscolhido;
  }
}
