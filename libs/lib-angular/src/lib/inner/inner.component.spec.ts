import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerComponent } from './inner.component';

describe('InnerComponent', () => {
  let component: InnerComponent;
  let fixture: ComponentFixture<InnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
