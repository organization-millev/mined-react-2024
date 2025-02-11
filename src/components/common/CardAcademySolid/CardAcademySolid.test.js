import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n'; // Asegúrate de tener configurado i18n para las traducciones
import CardAcademySolid from './CardAcademySolid';

test('debe renderizar correctamente el componente CardAcademySolid', () => {
    const mockProps = {
        files: [{ tag: 'educador_foto_descripcion', url: 'https://example.com/image.jpg' }],
        cargo: 'Profesor de Matemáticas',
        name: 'John Doe',
        description: 'Experto en álgebra y geometría.',
    };

    render(
        <I18nextProvider i18n={i18n}>
            <CardAcademySolid {...mockProps} />
        </I18nextProvider>
    );

    // Verifica que la imagen se renderiza con la URL correcta
    const imagen = screen.getByAltText(mockProps.cargo);
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', 'https://example.com/image.jpg');

    // Verifica que el título (name) se renderiza
    const nombre = screen.getByText(mockProps.name);
    expect(nombre).toBeInTheDocument();

    // Verifica que la descripción se renderiza
    const descripcion = screen.getByText(mockProps.description);
    expect(descripcion).toBeInTheDocument();

    // Verifica que la traducción para "directorAcademia" se renderiza
    const cargoTraducido = screen.getByText(i18n.t('directorAcademia'));
    expect(cargoTraducido).toBeInTheDocument();
});
