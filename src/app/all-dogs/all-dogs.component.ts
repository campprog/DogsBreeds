
import { Component, OnInit } from '@angular/core';
import { AllDogsService } from '../../Services/allDogs.service';
import { Dog } from '../../Models/dog.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserServices } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';
import { findIndex } from 'rxjs';
import { User } from '../../Models/user.model';



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
  user: User = this.authService.userLogged;
  toggleHeart() {
    this.heartSelected = !this.heartSelected;
  }
  verifyLikes(dogId: number): boolean {
    for (let like of this.authService.userLogged.likes) {
      if (like == dogId) {

        return true;
      }
    }

    return false;

  }

  setDogLiked(dogId: number) {
    if (this.verifyLikes(dogId)) {
      let findIndex: number = this.authService.userLogged.likes.findIndex((element) => element == dogId);
      console.log(findIndex)
      this.authService.userLogged.likes.splice(findIndex, 1)
      console.log(this.authService.userLogged.likes)

    }
    else {
      this.authService.userLogged.likes.push(dogId)
    }
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
