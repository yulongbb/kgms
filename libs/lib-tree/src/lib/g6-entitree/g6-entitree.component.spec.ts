import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G6EntitreeComponent } from './g6-entitree.component';

describe('G6EntitreeComponent', () => {
  let component: G6EntitreeComponent;
  let fixture: ComponentFixture<G6EntitreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [G6EntitreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(G6EntitreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
