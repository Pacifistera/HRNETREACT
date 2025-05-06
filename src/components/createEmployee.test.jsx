import { render, screen, fireEvent } from '@testing-library/react';
import CreateEmployee from './CreateEmployee';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const renderWithProvider = (ui) =>
  render(<Provider store={store}>{ui}</Provider>);

describe('CreateEmployee', () => {
  test('affiche tous les champs du formulaire', () => {
    renderWithProvider(<CreateEmployee />);
    expect(
      screen.getByText((content) => content.includes('Prénom'))
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de naissance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de début/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/État/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Code postal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Département/i)).toBeInTheDocument();
  });

  test("affiche un message d'erreur si on soumet le formulaire vide", () => {
    renderWithProvider(<CreateEmployee />);
    fireEvent.click(screen.getByText(/Enregistrer/i));
    expect(screen.getByText('Le prénom est requis')).toBeInTheDocument();
  });

  test('nom input has correct id', () => {
    renderWithProvider(<CreateEmployee />);
    expect(screen.getByLabelText('Nom')).toHaveAttribute('id', 'lastName');
  });
});
