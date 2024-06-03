import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDogsComponent } from './all-dogs.component';

describe('AllDogsComponent', () => {
  let component: AllDogsComponent;
  let fixture: ComponentFixture<AllDogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
