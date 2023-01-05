import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailComponent } from './instance-detail.component';

describe('InstanceDetailComponent', () => {
  let component: InstanceDetailComponent;
  let fixture: ComponentFixture<InstanceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstanceDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
