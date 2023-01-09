import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeglComponent } from './globegl.component';

describe('GlobeglComponent', () => {
  let component: GlobeglComponent;
  let fixture: ComponentFixture<GlobeglComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobeglComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobeglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
