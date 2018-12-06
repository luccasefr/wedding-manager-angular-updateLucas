import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieComponent } from './tie.component';

describe('TieComponent', () => {
  let component: TieComponent;
  let fixture: ComponentFixture<TieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
