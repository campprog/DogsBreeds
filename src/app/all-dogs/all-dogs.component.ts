
import { Component, OnInit } from '@angular/core';
import { AllDogsService } from '../../Services/allDogs.service';
import { Dog } from '../../Models/dog.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserServices } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';



@Component({
  selector: 'app-all-dogs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './all-dogs.component.html',
  styleUrl: './all-dogs.component.css'
})
export class AllDogsComponent {
  dogs: Dog[] = [];
  search: string = '';
  pageNumber: number = 1;
  limit: number = 10;
  heartSelected: boolean = false;



  constructor(private AllDogService: AllDogsService, private userService: UserServices, private authService: AuthService) { }

  toggleHeart() {
    this.heartSelected = !this.heartSelected;
  }
  verifyLikes() {
    this.userService.getOneUser(this.authService.userLogged).subscribe({
      next: (response) => {
        for (let i = 0; i < response.likes.length; i++) {
          for (let j = 0; j < this.dogs.length; j++)
            if (this.dogs[i].id == response.likes[i]) {
              //meter aqui a condiçao caso seja encontrado no array de likes o id do cao, meter o coracao ja preenchido
              //ou meter no getAllDogs()? em que recebe o userLogged do authservice
            }
        }
      }
    })
  }
  getLiked(id: number) {
    this.authService.userLogged.likes.push(id)
    this.userService.addLike(this.authService.userLogged).subscribe({
      next: (response) => {
        this.authService.userLogged = response
      }
    })
  }
  ngOnInit(): void {
    this.getAllDogs();

  }
  getAllDogs() {
    console.log("asdas");
    this.AllDogService.getDogs(this.pageNumber, this.limit).subscribe({
      next: (response) => {
        this.dogs = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  searchDogs() {
    this.dogs = [];
    console.log("asdsss");
    this.AllDogService.searchDog(this.search).subscribe({

      next: (response) => {
        this.dogs = response;

      },
      error: (error) => {
        console.log(error)
      }
    })

  }
  nextPage(): boolean {
    this.pageNumber++;
    this.getAllDogs();
    if (this.limit < 10) {
      return false;
    }
    else {
      return true;
    }

  }
  backpage() {
    this.pageNumber--;
    this.getAllDogs();
  }
  verifyPreviousPage(): boolean {
    if (this.pageNumber != 1) {
      return true;
    }
    else {
      return false;
    }
  }
  verifyNextPage(): boolean {
    return this.dogs.length == 10;
  }

}
