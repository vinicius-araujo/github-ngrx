import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  @Output()
  updateSearchQuery = new EventEmitter<any>();

  public form: FormGroup;
  public formSubscription: Subscription;
  private formValue: {
    query: string;
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.formSubscription = this.form.valueChanges.subscribe(value => {
      this.formValue = value;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      query: [null, Validators.required]
    });
  }

  search() {
    this.updateSearchQuery.emit({ ...this.formValue });
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

}
