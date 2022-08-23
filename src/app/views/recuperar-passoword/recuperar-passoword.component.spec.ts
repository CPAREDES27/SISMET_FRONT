import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPassowordComponent } from './recuperar-passoword.component';

describe('RecuperarPassowordComponent', () => {
  let component: RecuperarPassowordComponent;
  let fixture: ComponentFixture<RecuperarPassowordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarPassowordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarPassowordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
