import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjekteListePage } from './projekte-liste.page';

describe('ProjekteListePage', () => {
  let component: ProjekteListePage;
  let fixture: ComponentFixture<ProjekteListePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjekteListePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
