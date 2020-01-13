import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrdersRestaurantComponent } from './confirm-orders-restaurant.component';

describe('ConfirmOrdersRestaurantComponent', () => {
  let component: ConfirmOrdersRestaurantComponent;
  let fixture: ComponentFixture<ConfirmOrdersRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmOrdersRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrdersRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
