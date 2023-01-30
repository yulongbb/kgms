import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreantComponent } from './treant.component';

describe('TreantComponent', () => {
  let component: TreantComponent;
  let fixture: ComponentFixture<TreantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
