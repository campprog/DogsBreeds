import { Component, Input, OnInit } from '@angular/core';
import { AllDogsComponent } from '../all-dogs/all-dogs.component';
import { Dog } from '../../Models/dog.model';
import { AllDogsService } from '../../Services/allDogs.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dog-race ',
  standalone: true,
  imports: [AllDogsComponent, NavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './dog-race.component.html',
  styleUrl: './dog-race.component.css'

})
export class DogRaceComponent implements OnInit {
  id: number;
  dog: Dog | null = null;
  constructor(private AlldogService: AllDogsService, private activatedRoute: ActivatedRoute) { }
  relatedDogs: Dog[] = [];
  showRelatedDogs: boolean = false;

  ngOnInit(): void {
    this.getDogDetails();
  }
  mensagemResponseNull: string = '';
  getDogDetails() {
    this.showRelatedDogs = false;
    this.relatedDogs = [];
    this.mensagemResponseNull = '';
    this.AlldogService.getOneDog(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (response) => {
        this.dog = response;
        if (this.dog.relatedIds == null) {
          this.mensagemResponseNull = 'Doesnt have related Dogs'
        }
        else {
          this.showRelatedDogs = true;
          for (let id of this.dog.relatedIds) {
            this.AlldogService.getOneDog(id).subscribe({
              next: (response) => {
                this.relatedDogs.push(response);
              }
            })
          }
        }

      }
    });
  }


}