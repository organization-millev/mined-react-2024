import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { useTranslation } from 'react-i18next';
import './GraficoPastel.css'

const GraficoPai = ({ ClasesTomadas , ClasesRestantes }) => {
  
  const { t } = useTranslation();

  const [chartSize, setChartSize] = useState({ width: 400, height: 300 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setChartSize({ width: 137, height: 136 }); // tamaño para desktop
      } else {
        setChartSize({ width: 130, height: 128 }); // tamaño para mobile
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = [
    ['Task', 'Hours per Day'],
    ['Clases tomadas', ClasesTomadas],
    ['Clases restantes', ClasesRestantes],
  ];

  const options = {
    ...chartSize,
    slices: {
      0: { color: '#878D96' }, // bg-gris-oscuro
      1: { color: '#A2A9B0' }, // bg-gris-medio
    },
    tooltip: { trigger: 'none' }, // Desactiva los tooltips
    legend: 'none', // Disable the built-in legend
    pieSliceText: 'none', // Remove percentage labels
    enableInteractivity: false, // Desactiva la interactividad, incluyendo el hover
    backgroundColor: 'none', // Color de fondo blanco
    pieSliceBorderColor: 'none',
    chartArea: {
      left: 10,
      top: 10,
      width: '100%',
      height: '100%'
    },
  };

  const optionsMobile = {
    ...chartSize,
    slices: {
      0: { color: '#3486C5' }, // bg-azul-oscuro
      1: { color: '#75AFDB' }, // bg-celeste-medio
    },
    tooltip: { trigger: 'none' }, // Desactiva los tooltips
    legend: 'none', // Disable the built-in legend
    pieSliceText: 'none', // Remove percentage labels
    enableInteractivity: false, // Desactiva la interactividad, incluyendo el hover
    backgroundColor: 'none', // Color de fondo blanco
    pieSliceBorderColor: 'none',
    chartArea: {
      left: 10,
      top: 10,
      width: '80%',
      height: '80%'
    },
  };

  return (
    <div className="flex lg:flex-col items-center max-w-[205px] lg:justify-center w-full grafico-pastel-academias">
      <div className="hidden lg:block w-full">
        <div className=" flex justify-center">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={`${chartSize.width}px`}
          height={`${chartSize.height}px`}
        />
        </div>
      </div>
      
      <div className="lg:hidden  flex justify-center">
        <Chart
          chartType="PieChart"
          data={data}
          options={optionsMobile}
          width={`${chartSize.width}px`}
          height={`${chartSize.height}px`}
        />
      </div>
      <div className="mt-4 flex flex-col text-xs gap-2">
        <div className="flex items-center font-sans justify-center">
          <div className="w-[10px] h-[10px] !bg-[#3486C5] lg:!bg-gris-oscuro mr-2 rounded-full"></div>
          <span className="font-medium dark:text-gris-claro min-w-[117px] max-w-[118px]">{t('clasesTomadas')} ({ClasesTomadas}) </span>
        </div>
        <div className="flex items-center font-sans justify-center">
          <div className="w-[10px] h-[10px] !bg-[#75AFDB] lg:!bg-gris-medio mr-2 rounded-full"></div>
          <span className="font-medium dark:text-gris-claro min-w-[117px] max-w-[118px]">{t('clasesRestantes')} ({ClasesRestantes})</span>
        </div>
      </div>
    </div>
  );
}

export default GraficoPai;
