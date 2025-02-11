import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';
import { MemoryRouter } from 'react-router-dom';

// Mock del NavigationContext
jest.mock('../../../providers/NavigationContext', () => ({
  useNavigation: () => ({
    goToAcademyCurso: jest.fn(),
    goToAcademy: jest.fn(),
    goToEcommerceAcademyNoComprada: jest.fn(),
  }),
}));

test('renderiza el componente DropdownMenu con las props proporcionadas', () => {
  const props = {
    isOpen: true,
    listaAcademias: [
      { program_id: 1, name: 'Academia 1', is_enabled: 1 },
      { program_id: 2, name: 'Academia 2', is_enabled: 1 },
    ],
    listaCursos: () => [
      { course_id: 1, name: 'Curso 1', nameUrl: 'curso-1' },
      { course_id: 2, name: 'Curso 2', nameUrl: 'curso-2' },
    ],
    formatForURL: jest.fn((name) => name.toLowerCase().replace(/ /g, '-')),
    closeDropdown: jest.fn(),
  };

  render(
    <MemoryRouter>
      <DropdownMenu {...props} />
    </MemoryRouter>
  );

  // Validar que los elementos se renderizan correctamente
  expect(screen.getByText('Academia 1')).toBeInTheDocument();
  expect(screen.getByText('Academia 2')).toBeInTheDocument();

});


