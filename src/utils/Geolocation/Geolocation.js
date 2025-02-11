import React, { useEffect } from 'react';

const geolocation = ({ onLocation }) => {
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        onLocation(position.coords);
      },
      (error) => {
        console.error('Error al obtener la geolocalización:', error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [onLocation]);

  return null;
};

export default geolocation;
