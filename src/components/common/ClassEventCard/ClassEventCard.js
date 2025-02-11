import React from 'react';

const ClassEventCard = ({ events }) => {
    const size = events.length;
    const sizeOption = size === 1 ? "full" : ("1/" + size);
    let parentStyles = {
            overflow: 'hidden',
            lineHeight: '16px',
            maxHeight: (size === 1 ? '32px' : '16px'),
            whiteSpace: 'normal',
            textOverflow: 'clip'
    };
    return (
        <div className="flex flex-col justify-start items-start w-[145px] h-[130px] bg-transparent text-left gap-[3px]">
            {events.map((event, index) => (
                <div key={index} className={`bg-plata-suave flex flex-col justify-center items-start w-[145px] h-${sizeOption} last:mb-0 shadow-sm border-l-4 border-azul-oscuro-grisáceo rounded-lg`}>
                    <div className="flex items-center space-x-2 mb-1">
                        <div className="w-[20px] h-[20px] flex justify-center items-center">
                            {event.icon}
                        </div>
                        <p className="font-sans font-normal text-xs text-azul-oscuro-grisáceo">{event.hour}</p>
                    </div>
                    <div style={parentStyles}>
                        <p className="font-sans font-semibold text-xs text-gris-azulado-profundo pl-1">
                            {event.title}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ClassEventCard;
