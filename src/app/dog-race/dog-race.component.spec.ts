import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogRaceComponent } from './dog-race.component';

describe('DogRaceComponent', () => {
  let component: DogRaceComponent;
  let fixture: ComponentFixture<DogRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogRaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
