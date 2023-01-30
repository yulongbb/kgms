import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitreeComponent } from './entitree.component';

describe('EntitreeComponent', () => {
  let component: EntitreeComponent;
  let fixture: ComponentFixture<EntitreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
