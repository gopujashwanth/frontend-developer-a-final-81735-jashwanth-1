import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, EmployeeState } from './employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');
export const { selectAll: selectAllEmployees, selectEntities: selectEmployeeEntities } = adapter.getSelectors(selectEmployeeState);
export const selectLoading = createSelector(selectEmployeeState, s => s.loading);
export const selectSaving = createSelector(selectEmployeeState, s => s.saving);
export const selectError = createSelector(selectEmployeeState, s => s.error);
export const selectSelectedEmployee = createSelector(selectEmployeeState, s => s.selected);