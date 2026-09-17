import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import * as A from '../../../store/employee/employee.actions';
import * as S from '../../../store/employee/employee.selectors';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-employee-search', standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatCardModule, LoadingSpinnerComponent],
  template: `
  <div class="page">
    <div class="toolbar"><div><h1>Search Employee</h1><p>Find an employee by ID.</p></div><a mat-stroked-button routerLink="/employees">Back</a></div>
    <mat-card class="card" style="padding:20px">
      <form style="display:flex;gap:12px;align-items:center;flex-wrap:wrap" (ngSubmit)="search()">
        <mat-form-field appearance="outline" style="min-width:280px"><mat-label>Employee ID</mat-label><input matInput [formControl]="id"></mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="id.invalid">Search</button>
      </form>
      @if (loading$ | async) { <app-loading-spinner /> }
      @if (employee$ | async; as e) {
        <div style="margin-top:20px"><h2>{{e.name}}</h2><p><b>Email:</b> {{e.email}}</p><p><b>Mobile:</b> {{e.mobile}}</p><p><b>Country:</b> {{e.country}}</p><p><b>State:</b> {{e.state}}</p><p><b>District:</b> {{e.district}}</p></div>
      }
    </mat-card>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeSearchComponent {
  private readonly store = inject(Store);
  id = new FormControl('', {nonNullable:true, validators:[Validators.required]});
  employee$ = this.store.select(S.selectSelectedEmployee);
  loading$ = this.store.select(S.selectLoading);
  search() { if (this.id.valid) this.store.dispatch(A.loadEmployee({id:this.id.value.trim()})); }
}