import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proba2Component } from './proba2.component';

describe('Proba2Component', () => {
  let component: Proba2Component;
  let fixture: ComponentFixture<Proba2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Proba2Component]
    });
    fixture = TestBed.createComponent(Proba2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
