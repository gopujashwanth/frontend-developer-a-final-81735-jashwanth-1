import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as EA from '../../../store/employee/employee.actions';
import * as ES from '../../../store/employee/employee.selectors';
import * as CA from '../../../store/country/country.actions';
import * as CS from '../../../store/country/country.selectors';

@Component({
  selector: 'app-employee-form', standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule],
  template: `
  <div class="page">
    <div class="toolbar"><div><h1>{{editMode ? 'Edit Employee' : 'Add Employee'}}</h1><p>Enter valid employee information.</p></div></div>
    <form class="card" style="padding:24px;display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))" [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline"><mat-label>Name</mat-label><input matInput formControlName="name"><mat-error>Name is required (2-50 characters).</mat-error></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput type="email" formControlName="email"><mat-error>Enter a valid email.</mat-error></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Mobile</mat-label><input matInput formControlName="mobile"><mat-error>Enter 10-15 digits.</mat-error></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Country</mat-label><mat-select formControlName="country"><mat-option *ngFor="let c of (countries$ | async)" [value]="c.name">{{c.name}}</mat-option></mat-select><mat-error>Country is required.</mat-error></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>State</mat-label><input matInput formControlName="state"><mat-error>State is required.</mat-error></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>District</mat-label><input matInput formControlName="district"><mat-error>District is required.</mat-error></mat-form-field>
      <div style="grid-column:1/-1" class="actions"><a mat-stroked-button routerLink="/employees">Cancel</a><button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || (saving$ | async)">{{editMode ? 'Update' : 'Create'}}</button></div>
    </form>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);
  countries$ = this.store.select(CS.selectCountries);
  saving$ = this.store.select(ES.selectSaving);
  editMode = false;
  id = '';
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
    country: ['', Validators.required],
    state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    district: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
  });
  ngOnInit() {
    this.store.dispatch(CA.loadCountries());
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true; this.id = id; this.store.dispatch(EA.loadEmployee({id}));
      this.store.select(ES.selectSelectedEmployee).subscribe(e => { if (e?.id === id) this.form.patchValue(e); });
    }
  }
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    if (this.editMode) {
      this.store.dispatch(EA.updateEmployee({employee: {id: this.id, ...value}}));
      this.snack.open('Employee update request sent', 'OK', {duration: 2000});
    } else {
      this.store.dispatch(EA.addEmployee({employee: value}));
      this.snack.open('Employee create request sent', 'OK', {duration: 2000});
    }
    this.router.navigateByUrl('/employees');
  }
}