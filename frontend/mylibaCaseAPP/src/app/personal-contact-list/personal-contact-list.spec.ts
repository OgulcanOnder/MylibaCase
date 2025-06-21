import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalContactList } from './personal-contact-list';

describe('PersonalContactList', () => {
  let component: PersonalContactList;
  let fixture: ComponentFixture<PersonalContactList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalContactList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalContactList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
