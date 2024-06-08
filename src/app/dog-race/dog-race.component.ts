import { Component, Input, OnInit } from '@angular/core';
import { AllDogsComponent } from '../all-dogs/all-dogs.component';
import { Dog } from '../../Models/dog.model';
import { AllDogsService } from '../../Services/allDogs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dog-race ',
  standalone: true,
  imports: [AllDogsComponent],
  templateUrl: './dog-race.component.html',
  styleUrl: './dog-race.component.css'

})
export class DogRaceComponent implements OnInit {
  id: number;
  dog: Dog | null = null;
  constructor(private AlldogService: AllDogsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.AlldogService.getOneDog(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (response) => {
        this.dog = response;
      }
    });
  }



}