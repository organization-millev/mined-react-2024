import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import BannerInstructor from './BannerInstructor';

describe('BannerInstructor Component', () => {
  const mockActivarBanner = jest.fn();
  const mockDesactivar = jest.fn();
  const tools = [
    { price_int_id: '1', trans_txt_name: 'Tool 1', trans_txt_desc_prom_sale: 'Description 1' },
    { price_int_id: '2', trans_txt_name: 'Tool 2', trans_txt_desc_prom_sale: 'Description 2' }
  ];
  const periods = [
    { value: '1', label: 'Period 1' },
    { value: '2', label: 'Period 2' }
  ];
  const saleBanner = { trans_txt_name: 'Tool 1', trans_txt_desc_prom_sale: 'Description 1', sale_dt_end: '2023-12-31T23:59:59' };

  test('se renderiza sin fallos', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BannerInstructor tools={tools} periods={periods} activarBanner={mockActivarBanner} bannerActive={false} saleBanner={saleBanner} cargando={false} desactivar={mockDesactivar} />
      </I18nextProvider>
    );
  });

  test('renderiza el componente RadioButton con las opciones correctas', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BannerInstructor tools={tools} periods={periods} activarBanner={mockActivarBanner} bannerActive={false} saleBanner={saleBanner} cargando={false} desactivar={mockDesactivar} />
      </I18nextProvider>
    );
    periods.forEach(period => {
      expect(screen.getByLabelText(period.label)).toBeInTheDocument();
    });
  });

});