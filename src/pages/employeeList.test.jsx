import { render, screen } from '@testing-library/react';
import EmployeeList from './employeeList';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const renderWithProvider = (ui) =>
  render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

describe('EmployeeList', () => {
  test('affiche le message "Aucun employé trouvé" si la liste est vide', () => {
    renderWithProvider(<EmployeeList />);
    expect(screen.getByText(/Aucun employé trouvé/i)).toBeInTheDocument();
  });

  test('filtre la liste des employés avec la recherche', async () => {
    // Pré-remplir le store avec un employé fictif
    store.dispatch({
      type: 'employees/setEmployees',
      payload: [{ id: '1', firstName: 'Alice', lastName: 'Dupont' }],
    });

    renderWithProvider(<EmployeeList />);
    const searchInput = screen.getByPlaceholderText(/Rechercher/i);
    await userEvent.type(searchInput, 'Alice');
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
  });
});
