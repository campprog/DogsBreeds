
import { Component, OnInit } from '@angular/core';
import { AllDogsService } from '../../Services/allDogs.service';
import { Dog } from '../../Models/dog.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { UserServices } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';
import { findIndex } from 'rxjs';
import { User } from '../../Models/user.model';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-all-dogs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './all-dogs.component.html',
  styleUrl: './all-dogs.component.css'
})
export class AllDogsComponent {
  dogs: Dog[] = [];
  pageNumber: number = 1;
  limit: number = 9;
  heartSelected: boolean = false;
  user: User = this.authService.userLogged;
  search: string = '';
  clickTriggered: boolean = false;

  constructor(private AllDogService: AllDogsService, private userService: UserServices, private authService: AuthService) { }

  searchDogs(search: string) {
    this.AllDogService.searchDog(search).subscribe({
      next: (response) => {
        this.dogs = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
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
      this.authService.userLogged.likes.splice(findIndex, 1)
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
    this.search = '';
    this.AllDogService.getDogsForPageNumber(this.pageNumber, this.limit).subscribe({
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
      return false;
    }
    else {
      return true;
    }
  }

  verifyNextPage(): boolean {
    return this.dogs.length == 10;
  }
}
