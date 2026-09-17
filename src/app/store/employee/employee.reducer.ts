import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../core/models/employee.model';
import * as A from './employee.actions';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  saving: boolean;
  error: string | null;
  selected: Employee | null;
}
export const adapter = createEntityAdapter<Employee>();
export const initialState: EmployeeState = adapter.getInitialState({
  loading: false, saving: false, error: null, selected: null
});
export const employeeReducer = createReducer(
  initialState,
  on(A.loadEmployees, A.loadEmployee, s => ({ ...s, loading: true, error: null })),
  on(A.loadEmployeesSuccess, (s, { employees }) => adapter.setAll(employees, { ...s, loading: false })),
  on(A.loadEmployeeSuccess, (s, { employee }) => ({ ...adapter.upsertOne(employee, s), loading: false, selected: employee })),
  on(A.loadEmployeesFailure, A.loadEmployeeFailure, (s, { error }) => ({ ...s, loading: false, error })),
  on(A.addEmployee, A.updateEmployee, A.deleteEmployee, s => ({ ...s, saving: true, error: null })),
  on(A.addEmployeeSuccess, (s, { employee }) => ({ ...adapter.addOne(employee, s), saving: false })),
  on(A.updateEmployeeSuccess, (s, { employee }) => ({ ...adapter.updateOne({ id: employee.id, changes: employee }, s), saving: false, selected: employee })),
  on(A.deleteEmployeeSuccess, (s, { id }) => ({ ...adapter.removeOne(id, s), saving: false })),
  on(A.addEmployeeFailure, A.updateEmployeeFailure, A.deleteEmployeeFailure, (s, { error }) => ({ ...s, saving: false, error }))
);