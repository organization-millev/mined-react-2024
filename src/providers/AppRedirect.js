import React, { useEffect } from 'react';
import { isIOS, isAndroid } from 'react-device-detect';

const AppRedirect = () => {
  useEffect(() => {
    const redirectUrl = getStoreUrl();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, []);

  const getStoreUrl = () => {
    if (isIOS) {
      return 'https://apps.apple.com/pe/app/bonus-per%C3%BA/id1144602057'; // Reemplaza con el URL de tu app en la App Store
    } else if (isAndroid) {
      return 'https://play.google.com/store/apps/details?id=com.bonusapp2&hl=es_PE&gl=US'; // Reemplaza con el URL de tu app en Google Play
    } else  {
      return 'https://appgallery.huawei.com/app/C100103139'; // Reemplaza con el URL de tu app en AppGallery de Huawei
    }

    return null; // Devuelve null si el dispositivo no coincide con iOS, Android o Huawei
  };

  return (
    <div>
      Redirigiendo a la tienda de aplicaciones...
    </div>
  );
};

export default AppRedirect;
