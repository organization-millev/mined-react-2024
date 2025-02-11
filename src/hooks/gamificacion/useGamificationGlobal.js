import React, { useEffect, useState } from 'react';
import { apiGamificationGlobal } from '../../api/apiConfig';

export const useGamificationGlobal = (limit) => {
    //const [limit, setLimit] = useState(8);
    const [trigger, setTrigger] = useState(false);
    const { data: dataGamificationGlobal, error, cargando } = apiGamificationGlobal(trigger, limit);

    const [currentLevel, setCurrentLevel] = useState(null);
    const [lastUserAchievements, setLastUserAchievements] = useState([]);
    const [academyAchievements, setAcademyAchievements] = useState([]);

    const GetGamificationGlobal = () => {
        setTrigger(true);
    };
    
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    const sortAchievementsByDate = (achievements) => {
        return achievements.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    };

    useEffect(() => {
        if (dataGamificationGlobal) {
            if (Array.isArray(dataGamificationGlobal) && dataGamificationGlobal.length > 0) {
                const gamificationData = dataGamificationGlobal[0];

                
                if (Array.isArray(gamificationData.level) && gamificationData.level.length > 0) {
                    const levelData = gamificationData.level[0];
                    const levelTranslation = levelData?.level_translations?.find(
                        translation => translation.lng_txt_code === language_code
                    );
                    const nextLevelTranslation = levelData?.next_level_translations?.find(
                        translation => translation.lng_txt_code === language_code
                    );

                    setCurrentLevel({
                        levelId: levelData?.lvl_int_id,
                        requiredPoints: levelData?.lvl_int_required_points,
                        nextLevel: levelData?.next_level,
                        remainingPoints: levelData?.remaining_points,
                        nextRequiredPoints: levelData?.next_required_points,
                        currentPoints: levelData?.current_points,
                        nextAvatar: levelData?.next_avatar,
                        levelTranslation: {
                            name: levelTranslation?.trn_txt_name,
                            description: levelTranslation?.trn_txt_description
                        },
                        nextLevelTranslation: {
                            name: nextLevelTranslation?.trn_txt_name,
                            description: nextLevelTranslation?.trn_txt_description
                        }
                    });
                }

                // Extraer logros del usuario
                if (Array.isArray(gamificationData.last_user_achievements)) {
                    const userAchievements = gamificationData.last_user_achievements.map(achievement => {
                        const translation = achievement.achievement_translations?.find(translation => translation.lng_txt_code === language_code);
                        const fallbackTranslation = achievement.achievement_translations?.[0];
                    
                        return {
                            id: achievement.achv_int_id,
                            points: achievement.achv_int_points,
                            iconUrl: achievement.achv_txt_icon_url,
                            iconName: achievement.achv_txt_key,
                            courseName: achievement.course_name,
                            languageCourse: achievement.pnt_txt_lng_code,
                            progress: achievement.progress,
                            currentClasses: achievement.current_classes,
                            totalClasses: achievement.total_classes,
                            fechaCreacion:achievement.usr_achv_dt_created_at,
                            targetClasses: Math.trunc(achievement.target_classes),
                            translationName: translation ? translation.trn_txt_name : fallbackTranslation?.trn_txt_name,
                            translationDescription: translation ? translation.trn_txt_description : fallbackTranslation?.trn_txt_description,
                        };
                    });
                    setLastUserAchievements(userAchievements);
                    //setLastUserAchievements(sortAchievementsByDate(userAchievements));
                }

                


                // Extraer logros de la academia
                /*const academyData = gamificationData.academy_achievements.map(achievement => ({
                    academyName: achievement.academy_name,
                    progress: achievement.progress_academy,
                    totalDuration: achievement.total_duration,
                    achievements: achievement.achievements.map(a => ({
                        id: a.achv_int_id,
                        points: a.achv_int_points,
                        activity: a.pnt_rl_txt_activity,
                        courseName: a.course_name,
                        iconUrl: a.achv_txt_icon_url,
                        targetClasses: a.target_classes,
                    })),
                    directors: achievement.directors.map(director => ({
                        name: director.name,
                        photo: director.tea_txt_photo,
                        description: director.translations.find(t => t.translation_code === language_code)?.translation_description,
                    })),
                }));
                setAcademyAchievements(academyData);*/
                const academyData = gamificationData.academy_achievements.map(achievement => {
                    // Imprimir 'totalDuration' directamente dentro del map
                    //console.log('totalDuration', achievement.total_duration);
                
                    return {
                        academyName: achievement.academy_name,
                        progress: achievement.progress_academy,
                        totalDuration: achievement.total_duration,
                        academyTags: achievement.academy_tags.map(tag => ({
                            id: tag.tag_int_id,
                            name: tag.tag_txt_name,
                            value: tag.tag_txt_value
                        })),
                        achievements: achievement.courses?.flatMap(course => 
                            course.achievements.map(a => {
                                const filteredTranslations = a.translations.filter(t => t.lng_txt_code);
                                const translationDescription = filteredTranslations.length > 0 ? filteredTranslations[0].trn_txt_description : null;
                    
                                return {
                                    id: a.achv_int_id,
                                    points: a.achv_int_points,
                                    activity: a.pnt_rl_txt_activity,
                                    courseName: a.course_name,
                                    languageCourse: a.pnt_txt_lng_code,
                                    iconUrl: a.achv_txt_icon_url,
                                    targetClasses: Math.trunc(a.target_classes),
                                    currentClasses: a.current_classes,
                                    totalClasses: a.total_classes,
                                    progress: a.progress,
                                    translations: filteredTranslations.map(t => ({ 
                                        id: t.trn_int_id,
                                        name: t.trn_txt_name,
                                        description: t.trn_txt_description
                                    })),
                                    translationDescription
                                };
                            })
                        ),
                        directors: achievement.directors.map(director => ({
                            name: director.name,
                            photo: director.tea_txt_photo,
                            description: director.translations.find(t => t.translation_code === language_code)?.translation_description,
                        })),
                    };
                });
                
                setAcademyAchievements(academyData);





            }
        } else if (error) {
            console.error('Error al obtener datos de gamificación global:', error);
        }
    }, [dataGamificationGlobal, error]);

    return { GetGamificationGlobal, currentLevel, lastUserAchievements, academyAchievements, cargando };
};