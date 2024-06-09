import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user.model';
import { UserServices } from '../../Services/user.service';
import { AllDogsService } from '../../Services/allDogs.service';
import { AuthService } from '../../Services/auth.service';
import { Dog } from '../../Models/dog.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-likes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-likes.component.html',
  styleUrl: './user-likes.component.css'
})
export class UserLikesComponent implements OnInit {
  user: User;
  dogsLiked: Dog[] = [];
  constructor(private allDogService: AllDogsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.showLikedDogs();
  }

  showLikedDogs() {
    for (let idDogLiked of this.authService.userLogged.likes) {
      this.allDogService.getdogsLiked(idDogLiked).subscribe({
        next: (response) => {
          this.dogsLiked.push(response);
        }
      })
    }
  }
}
