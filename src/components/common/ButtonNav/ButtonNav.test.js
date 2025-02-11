import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ButtonNav from './ButtonNav';

// Mock del UserContext
jest.mock('../../../providers/UserContext', () => ({
  useUser: () => ({
    userData: {},
    setCourseType: jest.fn(),
    isCourseType: jest.fn(() => false),
    synchronous: 'synchronous',
    asynchronous: 'asynchronous',
  }),
}));

// Mock del AcademiaContext
jest.mock('../../../providers/AcademiaContext', () => ({
  useAcademia: () => ({
    getCourseDetails: jest.fn(() => ({
      isAsincronico: 0,
      isSincronico: 1,
    })),
    getIdsByName: jest.fn(() => ({
      programId: 1,
      courseId: 1,
    })),
  }),
}));

test('Renderiza el componente ButtonNav sin fallar', () => {
  render(
    <BrowserRouter>
      <ButtonNav 
        homeSwitch={true} 
        isMisAcademias={false} 
        isModules={false} 
        isMiCalendario={false} 
        isStreamming={false} 
      />
    </BrowserRouter>
  );

  // Verifica que los botones se rendericen
  expect(screen.getByText('Academy')).toBeInTheDocument();
  expect(screen.getByText('Live')).toBeInTheDocument();
});
