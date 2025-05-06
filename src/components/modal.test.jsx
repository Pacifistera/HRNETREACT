import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '@pacifister/react-modal-hrnet';

describe('Modal', () => {
  test("n'affiche rien si isOpen est false", () => {
    render(<Modal isOpen={false} onClose={() => {}} message="Test" />);
    expect(screen.queryByText(/Test/)).not.toBeInTheDocument();
  });

  test('affiche le message si isOpen est true', () => {
    render(<Modal isOpen={true} onClose={() => {}} message="Test" />);
    expect(screen.getByText(/Test/)).toBeInTheDocument();
  });

  test('ferme la modal au clic sur OK', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose} message="Test" />);
    fireEvent.click(screen.getByText(/OK/i));
    expect(onClose).toHaveBeenCalled();
  });
});
