import reducer, {
  addEmployee,
  deleteEmployee,
  setEmployees,
} from './employeeSlice';

describe('employeeSlice', () => {
  const initialState = { employees: [] };

  test('ajoute un employé', () => {
    const newEmployee = { id: '1', firstName: 'John', lastName: 'Doe' };
    const state = reducer(initialState, addEmployee(newEmployee));
    expect(state.employees).toHaveLength(1);
    expect(state.employees[0].firstName).toBe('John');
  });

  test('supprime un employé', () => {
    const stateWithEmployee = { employees: [{ id: '1', firstName: 'John' }] };
    const state = reducer(stateWithEmployee, deleteEmployee('1'));
    expect(state.employees).toHaveLength(0);
  });

  test('remplace tous les employés', () => {
    const newList = [{ id: '2', firstName: 'Jane' }];
    const state = reducer(initialState, setEmployees(newList));
    expect(state.employees).toEqual(newList);
  });
});
