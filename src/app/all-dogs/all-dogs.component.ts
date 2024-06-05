
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
  constructor(private AllDogService: AllDogsService) { }

  ngOnInit(): void {
    this.getAllDogs();
  }

  getAllDogs() {
    console.log("asdas");
    this.AllDogService.getDogs().subscribe({
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
        console.log(response);
      },
      error: (error) => {
        console.log(error)
      }
    })

  }
}
