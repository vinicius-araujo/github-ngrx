import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value when form is valid', () => {
    const spy = spyOn(component.updateSearchQuery, 'emit');
    component.form.patchValue({ query: 'Hello' });
    component.search();
    expect(spy).toHaveBeenCalled();
  });

  it('should set query Input', () => {
    const spy = spyOn(component.form, 'patchValue');
    component.query = 'Test';
    expect(spy).toHaveBeenCalled();
  });

  it('should not set query Input', () => {
    component.form = null;
    component.query = 'Test';
    expect(component.form).toEqual(null);
  });

  it('should not unsubscribe formSubscription', () => {
    const spy = spyOn(component.formSubscription, 'unsubscribe');
    component.formSubscription = null;
    component.ngOnDestroy();

    expect(component.formSubscription).toBe(null);
    expect(spy).not.toHaveBeenCalled();
  });
});
