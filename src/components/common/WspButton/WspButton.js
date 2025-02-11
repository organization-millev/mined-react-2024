import React from 'react';

const WspButton = () => {
  // Número de teléfono de destino (con el código de país, sin espacios ni caracteres especiales)
  const phoneNumber = '51936568782'; // Reemplaza esto con el número deseado

  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white p-3 rounded-full shadow-lg transition duration-300"
        style={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: 1000, backgroundColor: '#5fd568' }}
        aria-label="WhatsApp Chat"
    >
        <img src={`${process.env.REACT_APP_URL_IMG}/assets/images/LogoWtsp.png`} className="w-6 h-6 fill-current" alt="WhatsApp Logo" />
        {/*<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6 fill-current"
        >
            <path d="M380.9 97.1c-42.3-42.2-98.8-65.5-158.9-65.5-124.4 0-225.6 101.2-225.6 225.6 0 39.7 10.5 78.6 30.5 112.7L2.9 471.3c-2.9 7.1 4.6 13.5 11.5 10.6l111.1-46.5c32.3 17.6 68.6 26.9 105.8 26.9 124.4 0 225.6-101.2 225.6-225.6 0-60.1-23.3-116.6-65.5-158.9zM224 426.5c-31.4 0-62.1-8.3-89.1-24.2l-6.4-3.8-66 27.6 23.7-64.5-4.2-6.7c-18.7-29.9-28.6-64.5-28.6-99.8 0-101.5 82.5-184 184-184 49.1 0 95.2 19.1 129.8 53.8s53.8 80.7 53.8 129.8c0 101.5-82.5 184-184 184zm101.4-138.5c-5.5-2.8-32.7-16.1-37.8-17.9s-8.8-2.8-12.5 2.8-14.4 17.9-17.6 21.5-6.5 4.1-12 1.4c-5.5-2.8-23.4-8.6-44.5-27.4-16.5-14.7-27.6-32.8-30.8-38.4-3.2-5.5-.3-8.5 2.5-11.3 2.6-2.6 5.5-6.5 8.2-9.8s3.6-5.5 5.5-9.1c1.8-3.7.9-6.9-.5-9.8s-12.5-30.2-17.1-41.3c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.8 1.4-14.9 6.9c-5 5.5-19.6 19.2-19.6 46.4s20.1 53.9 22.9 57.6 39.4 60.3 95.2 84.5c35.4 15.3 49.2 16.7 66.8 14.1 10.7-1.6 32.7-13.3 37.4-26.2 4.6-12.9 4.6-24 3.2-26.2-1.3-2.1-5-3.8-10.5-6.6z" />
        </svg>*/}
    </a>
  );
};

export default WspButton;