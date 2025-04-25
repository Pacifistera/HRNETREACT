import { createSlice } from '@reduxjs/toolkit';

// Notre état initial
const initialState = {
  employees: JSON.parse(localStorage.getItem('employees') || '[]'),
};

// Création du slice -
const employeeSlice = createSlice({
  name: 'employees',
  initialState, // L'état initial
  reducers: {
    //  gérer les modifications
    addEmployee: (state, action) => {
      // Ajouter un nouvel employé
      state.employees.push(action.payload);
      // Sauvegarder dans le localStorage
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    setEmployees: (state, action) => {
      // Remplacer tous les employés
      state.employees = action.payload;
      localStorage.setItem('employees', JSON.stringify(action.payload));
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
  },
});

// On exporte nos actions
export const { addEmployee, setEmployees, deleteEmployee } =
  employeeSlice.actions;
// On exporte notre reducer
export default employeeSlice.reducer;
