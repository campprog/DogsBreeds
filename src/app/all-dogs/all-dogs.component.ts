
import { Component, OnInit } from '@angular/core';
import { AllDogsService } from '../../Services/allDogs.service';
import { Dog } from '../../Models/dog.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-dogs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-dogs.component.html',
  styleUrl: './all-dogs.component.css'
})
export class AllDogsComponent {
  dogs: Dog[] = [];
  search: string = '';
  pageNumber: number = 1;
  pageBool: boolean = false;
  constructor(private AllDogService: AllDogsService) { }

  ngOnInit(): void {
    this.getAllDogs();

  }

  getAllDogs() {
    console.log("asdas");
    this.AllDogService.getDogs(this.pageNumber).subscribe({
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

  nextPage() {
    this.pageNumber++;
    this.getAllDogs();
    console.log(this.pageNumber)
  }
  backpage(): boolean {
    if (this.pageNumber != 1) {
      console.log(this.pageNumber, this.pageBool)
      return this.pageBool;
    }
    else {
      return this.pageBool;
    }
  }
}
