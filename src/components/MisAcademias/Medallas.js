import React from 'react';

const Medallas = ({ courseAchievements }) => {
    // Inicializamos el contador de medallas global para todos los cursos
    const totalAchievementsCount = {
        bronce: 0,
        plata: 0,
        oro: 0
    };

    // Recorremos todos los cursos y sus logros para acumular las medallas
    if (Array.isArray(courseAchievements)) {
        courseAchievements.forEach((course) => {
            if (Array.isArray(course.achievements)) {
                course.achievements.forEach((achievement) => {
                    if (achievement.achv_txt_icon_url.includes('bronce')) {
                        totalAchievementsCount.bronce++;
                    } else if (achievement.achv_txt_icon_url.includes('plata')) {
                        totalAchievementsCount.plata++;
                    } else if (achievement.achv_txt_icon_url.includes('oro')) {
                        totalAchievementsCount.oro++;
                    }
                });
            }
        });
    }

    return (
        <div className="flex flex-wrap gap-2 justify-start p-2">
            {/* Mostramos las medallas totales agrupadas */}
            {totalAchievementsCount.bronce > 0 && (
                <div className="flex flex-row items-center">
                    <img
                        src="https://44.223.159.218:8082/assets/medallas/bronce.png"
                        alt="Bronce"
                        width="64px"
                        height="64px"
                        style={{ padding: '0px' }}
                    />
                    <p className="font-semibold text-xl dark:text-white">x{totalAchievementsCount.bronce}</p>
                </div>
            )}
            {totalAchievementsCount.plata > 0 && (
                <div className="flex flex-row items-center">
                    <img
                        src="https://44.223.159.218:8082/assets/medallas/plata.png"
                        alt="Plata"
                        width="64px"
                        height="64px"
                        style={{ padding: '0px' }}
                    />
                    <p className="font-semibold text-xl dark:text-white">x{totalAchievementsCount.plata}</p>
                </div>
            )}
            {totalAchievementsCount.oro > 0 && (
                <div className="flex flex-row items-center">
                    <img
                        src="https://44.223.159.218:8082/assets/medallas/oro.png"
                        alt="Oro"
                        width="64px"
                        height="64px"
                        style={{ padding: '0px' }}
                    />
                    <p className="font-semibold text-xl dark:text-white">x{totalAchievementsCount.oro}</p>
                </div>
            )}
        </div>
    );
};

export default Medallas;
