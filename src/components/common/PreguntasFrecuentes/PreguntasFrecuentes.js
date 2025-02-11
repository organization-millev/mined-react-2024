import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconoMas from '../../iconos/add.js';
import IconoMenos from '../../iconos/remove.js';

import IconoMasDark from '../../iconos/icono_mas_blanco.js';
import IconoMenosDark from '../../iconos/icono_menos_blanco.js';

import './PreguntasFrecuentes.css';

const PreguntasFrecuentes = ({ faqs }) => {
    const [openIds, setOpenIds] = useState(new Set());

    const toggleAccordion = (id) => {
        const newOpenIds = new Set(openIds);
        if (newOpenIds.has(id)) {
            newOpenIds.delete(id);
        } else {
            newOpenIds.add(id);
        }
        setOpenIds(newOpenIds);
    };
    
    const processDescriptionWithLineBreaks = (description) => {
        if (description && typeof description === 'string') {
            return description; // Mantener el HTML tal como está
        }
        return description;
    };
    
    
    return (
        <div className="w-full mx-auto">
            {/*<h2 className="text-xl lg:text-3xl font-semibold text-center lg:mb-8 font-sans text-gris-azulado-profundo ">Preguntas Frecuentes</h2>*/}
            {faqs.map(faq => (
                <div key={faq.faq_id} className="bg-white dark:bg-color-dark2 rounded-[20px] shadow-custom-strong overflow-hidden mb-5 ">
                    <button
                        className="flex justify-between items-center w-full p-5 font-sans text-sm lg:text-base text-left text-gray font-semibold"
                        onClick={() => toggleAccordion(faq.faq_id)}
                    >
                        <p className="w-[90%] dark:text-blanco">{faq.question}</p>
                        <p className="transition-opacity duration-300 ease-in-out transform">
                            <IconoMenos
                                className={`opacity-${openIds.has(faq.faq_id) ? '100 block dark:hidden' : '0 hidden'}`}
                                width="24px"
                                height="24px"
                                style={{ transition: 'opacity 0.9s ease' }}
                            />
                            
                            <IconoMenosDark
                                className={`opacity-${openIds.has(faq.faq_id) ? '100 hidden dark:block' : '0 hidden'}`}
                                width="24px"
                                height="24px"
                                style={{ transition: 'opacity 0.9s ease' }}
                            />
                            
                            
                            <IconoMas
                                className={`opacity-${openIds.has(faq.faq_id) ? '0 hidden ' : '100 block dark:hidden'}`}
                                width="24px"
                                height="24px"
                                style={{ transition: 'opacity 0.9s ease' }}
                            />
                            <IconoMasDark
                                className={`opacity-${openIds.has(faq.faq_id) ? '0 hidden' : '100 hidden dark:block'}`}
                                width="24px"
                                height="24px"
                                style={{ transition: 'opacity 0.9s ease' }}
                            />
                        </p>
                    </button>
                    <div
                        className={`transition-max-height duration-300 ease-in-out delay-150 overflow-hidden  ${
                            openIds.has(faq.faq_id) ? 'max-h-96' : 'max-h-0'
                        }`}
                    >
                        <div className="p-5 font-sans text-sm lg:text-base dark:text-blanco">
                            {/*
                            <p>{faq.answer}</p>
                            */}
                            <p dangerouslySetInnerHTML={{ __html: processDescriptionWithLineBreaks(faq.answer) }}></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

PreguntasFrecuentes.propTypes = {
    faqs: PropTypes.array.isRequired,
};

export default PreguntasFrecuentes;