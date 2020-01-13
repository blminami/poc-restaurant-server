import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemsModalComponent } from './user-items-modal.component';

describe('UserItemsModalComponent', () => {
  let component: UserItemsModalComponent;
  let fixture: ComponentFixture<UserItemsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
