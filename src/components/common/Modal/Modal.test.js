import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

test("debe renderizar el componente Modal.Body con los hijos correctamente", () => {
  const { getByText } = render(
    <Modal.Body>
      <p>Contenido del cuerpo del modal</p>
    </Modal.Body>
  );

  expect(getByText('Contenido del cuerpo del modal')).toBeInTheDocument();
});

test("debe renderizar el componente Modal.Footer con los hijos y la clase correctamente", () => {
  const { getByText } = render(
    <Modal.Footer classNamefoot="custom-class">
      <p>Contenido del pie del modal</p>
    </Modal.Footer>
  );

  expect(getByText('Contenido del pie del modal')).toBeInTheDocument();
  expect(getByText('Contenido del pie del modal').parentElement).toHaveClass('custom-class');
});