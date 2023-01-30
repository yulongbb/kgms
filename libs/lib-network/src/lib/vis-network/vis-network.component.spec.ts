import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisNetworkComponent } from './vis-network.component';

describe('VisNetworkComponent', () => {
  let component: VisNetworkComponent;
  let fixture: ComponentFixture<VisNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisNetworkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
