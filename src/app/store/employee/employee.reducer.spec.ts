import { employeeReducer, initialState } from './employee.reducer';
import * as A from './employee.actions';
describe('employeeReducer', () => {
  it('adds an employee', () => {
    const employee = {id:'1',name:'Test',email:'test@test.com',mobile:'1234567890',country:'India',state:'Telangana',district:'Hyderabad'};
    const state = employeeReducer(initialState, A.addEmployeeSuccess({employee}));
    expect(state.ids).toContain('1');
    expect(state.entities['1']?.name).toBe('Test');
  });
  it('removes an employee', () => {
    const employee = {id:'1',name:'Test',email:'test@test.com',mobile:'1234567890',country:'India',state:'Telangana',district:'Hyderabad'};
    let state = employeeReducer(initialState, A.addEmployeeSuccess({employee}));
    state = employeeReducer(state, A.deleteEmployeeSuccess({id:'1'}));
    expect(state.ids).not.toContain('1');
  });
});