import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageModalComponent } from './home-page-modal.component';

describe('HomePageModalComponent', () => {
  let component: HomePageModalComponent;
  let fixture: ComponentFixture<HomePageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
