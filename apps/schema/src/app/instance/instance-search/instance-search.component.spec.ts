import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSearchComponent } from './instance-search.component';

describe('InstanceSearchComponent', () => {
  let component: InstanceSearchComponent;
  let fixture: ComponentFixture<InstanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstanceSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
