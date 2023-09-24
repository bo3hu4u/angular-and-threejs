import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntexsoftComponent } from './intexsoft.component';

describe('IntexsoftComponent', () => {
  let component: IntexsoftComponent;
  let fixture: ComponentFixture<IntexsoftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntexsoftComponent]
    });
    fixture = TestBed.createComponent(IntexsoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
