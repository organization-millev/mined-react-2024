import React from 'react';
import { render } from '@testing-library/react';
import LoaderCircular from './LoaderCircular';

test("debe renderizar el componente LoaderCircular correctamente", () => {
  const { getByRole } = render(<LoaderCircular size={50} strokeWidth={5} radius={20} />);
  
  const svgElement = getByRole('img');
  expect(svgElement).toBeInTheDocument();
  expect(svgElement).toHaveAttribute('width', '50');
  expect(svgElement).toHaveAttribute('height', '50');
});