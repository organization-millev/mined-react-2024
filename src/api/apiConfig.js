
import { ApiPost } from './apiClient';
import { obtenerInfoDispositivo } from '../utils/funciones';

const API_ENDPOINTS = {
  auth: {
    login: '/auth/token',
    refreshToken: '/auth/token',
    user: '/auth/user',
    savePhoto:'/auth/user/save/photo',
    permissions: '/auth/permissions',
    teacherAuth: '/auth/teacher',
  },
  academy: { 
    list: '/academy/list',
    courses: '/academy/courses',
    translations: '/academy/translations',
    recommended:'/academy/courses/recommended',
    keepWatching:'/academy/courses/keep/watching',
    favoriteCourse:'/academy/courses/favorite',
    favoriteListCourse:'/academy/courses/favorite/list',
    achievements:'/academy/achievements',
    certificates:{
      listaCertificates:'/academy/courses/certificate/user/list',
      descargarCertificates:'/academy/courses/certificate/user/generate',
    },
    teacherAcademyFavorite:'/live/channel/favorite',
    enrollment:'academy/user/enrollment/add',
    bannerPromotional:'/academy/banner/promotional',
  },
  ecommerce: {
    tools: '/ecommerce/tools',
    products: '/ecommerce/products',
  },
  
  gamification: {
    
    listTitle: '/gamification/title/list',
    listAvatar: '/gamification/avatar/list',
    gamificationGlobal:'/gamification/user/achievement/profile',
    
    avatarLevelNext: '/gamification/avatar/level/next',//detalle obtener info nivel de usuario
    listGroup: '/gamification/group/list',
    userAchievementDetail: '/gamification/user/achievement/detail', //listar logros GamificationUserAchievementDetail
    userAchievementRecent: '/gamification/user/achievement/recent',
    userAvatarSave: '/gamification/user/avatar/save',
    userLevel: '/gamification/user/level',
    userTitle: '/gamification/user/title' //guarda el tutulo del usuario
    
  },
  live: {
    stream: '/live/stream',
    calendar: '/live/calendar',
    myCalendar: '/live/mycalendar',
    questions: '/live/questions',
    questionsList: '/live/questions/list',
    materials: '/live/materials',
    sessionArchive: '/live/session/archive',
    streaming: '/live/streaming',
    favorites:'/live/channel/favorite',
    ratings: {
      save: '/live/ratings/save',
      ratings: '/live/ratings',
    }
  },
  async: {
    ratings: '/async/ratings',
    coursesModules: '/async/courses/modules',
    coursesContent: '/async/content/list', //'/async/courses/recommended',
    saveRatingCourse:'async/ratings/save',
    materialCourse:'/async/materials',
    teacherFavorite:'/sync/teachers/favorite/list',
    calendarAdd:'/sync/calendar/user/add',
    calendarList:'/sync/calendar/user/list',
    calendarRemove:'/sync/calendar/user/remove',
  },
  sync:{
    ratingEducator: '/sync/rate/comment/available',
    uploadMaterialEducator:'/sync/material/upload',
    deleteMaterialEducator:'/sync/material/delete',
    editVideoEducator:'/sycn/session/archive/update',
    questionRemove:'/sync/question/remove',
    disableVideo:'/sycn/session/archive/available',
    upsertPlaylist:'/sync/playlist/upsert',
  },
  help: {
    faq: '/help/faq',
    reels: '/help/reels',
    contactRegister: '/help/contact/register',
  },
  checkout:{
    yuno:{
      client:'/yuno/checkout/client',
      session:'/yuno/checkout/session',
      pay:'/yuno/checkout/pay'
    },
    binance:{
      order:'/binance/checkout/order',
      state:'/binance/checkout/status'
    },
    nuvei:{
      order:'/nuvei/checkout/order'
    }
  },
  shop:{
    cart:{
      get:'/shop/cart/get',
      item:{
        delete:'/shop/cart/item/delete',
        add:'/shop/cart/item/add',
        direct:'/shop/cart/item/direct'
      },
    },
    
    order:{
      set:'/shop/order/set',
      get:'/shop/order/get'
    }
  },
  sale:{
    get:'/live/channel/sale/get',
    set:'/live/channel/sale/set',
    tools:'/live/channel/sale/tools',
    deactivate:'/live/channel/sale/deactivate',
    
  },
  support: {
    notifications: '/support/notifications',
    timeZone:'/support/time/zone/get',
  }
};

export const AUTH_HEADERS = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/x-www-form-urlencoded'
});


const auth = true;
//const language_code  = "ES";
const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
const language_code_modules = (localStorage.getItem('languageModules') || 'es').toUpperCase();

const time_zone_global = localStorage.getItem('selectedCountry') || 'America/Lima';


const ip_address = sessionStorage.getItem('ipUsuario') || 'No disponible';
const user_country = sessionStorage.getItem('paisUsuario') || 'No disponible';
const { sistemaOperativo, tipoDispositivo } = obtenerInfoDispositivo();
// Hooks para la sección de autenticación
export const apiLogin = (triggerApiCall,username,password,grant_type="password",user_agent,app_name="web") => {
  const parametrosPost = { username:username, 
                           password:password,
                           grant_type:grant_type,
                           ip_address:ip_address,
                           user_agent:sistemaOperativo,
                           user_country:user_country,
                           app_name:app_name,
                           device:tipoDispositivo
    
  };
  return ApiPost(triggerApiCall, API_ENDPOINTS.auth.login, {}, parametrosPost);
};


export const apiRefreshToken= (triggerApiCall,refresh_token,grant_type="refresh_token") => {
  const parametrosPost = { refresh_token:refresh_token,grant_type:grant_type };
  return ApiPost(triggerApiCall, API_ENDPOINTS.auth.refreshToken, {}, parametrosPost);
};


export const apiGetUser = (triggerApiCall) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.auth.user, {}, {} ,auth);
};

export const apiSavePhoto = (triggerApiCall,image_base64) => {
  const parametrosPost = { image_base64:image_base64 };
  return ApiPost(triggerApiCall, API_ENDPOINTS.auth.savePhoto, {}, parametrosPost ,auth);
};

// Hooks para la sección de academia
export const apiAcademyList = (triggerApiCall) => {
  const parametrosPost = { language_code:language_code };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.list, {}, parametrosPost, auth);
};



export const apiPermissions = (triggerApiCall) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.auth.permissions, {}, {}, auth);
};

export const apiTeacherAuth = (triggerApiCall) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.auth.teacherAuth, {}, {} , auth);
};


export const apiAcademyCourses = (triggerApiCall) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.courses, {}, {} , auth);
};

export const apiAcademyTranslations = (triggerApiCall) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.translations, {}, {} , auth);
};

export const apiAcademyRecommended = (triggerApiCall,limit,course_id) => {
  const parametrosPost = { limit:limit,course_id:course_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.recommended, {}, parametrosPost , auth);
};

export const apiAcademyKeepWatching = (triggerApiCall,course_type) => {
  const parametrosPost = { language_code:language_code,course_type:course_type };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.keepWatching, {}, parametrosPost , auth);
};

export const apiAcademyCourseFavorite = (triggerApiCall, course_id, course_type) => {
  const parametrosPost = { course_id:course_id, course_type:course_type };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.favoriteCourse, {}, parametrosPost , auth);
};

export const apiAcademyCourseFavoriteList = (triggerApiCall,course_type ) => {
  const parametrosPost = { language_code:language_code, course_type:course_type  };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.favoriteListCourse, {}, parametrosPost , auth);
};

export const apiAcademyAchievements = (triggerApiCall,academy_id) => {
  const parametrosPost = { language_code:language_code, academy_id:academy_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.achievements, {}, parametrosPost , auth);
};


export const apiMyCertificates = (triggerApiCall,limit) => {
   const parametrosPost = { limit:limit };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.certificates.listaCertificates, {}, parametrosPost , auth);
};

export const apiDownloadCertificates = (triggerApiCall,certificate_id) => {
  const parametrosPost = { certificate_id:certificate_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.certificates.descargarCertificates, {}, parametrosPost , auth);
};

export const apiTeacherAcademyFavorite = (triggerApiCall,teacher_id ) => {
  const parametrosPost = { teacher_id :teacher_id  };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.teacherAcademyFavorite, {}, parametrosPost , auth);
};

export const apiEnrollment = (triggerApiCall, course_id, academy_type, academy_id ) => {
  const parametrosPost = { course_id :course_id , academy_type:academy_type, academy_id:academy_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.enrollment, {}, parametrosPost , auth);
};

export const apiBannerPromotional = (triggerApiCall ) => {
  const parametrosPost = { language_code:language_code };
  return ApiPost(triggerApiCall, API_ENDPOINTS.academy.bannerPromotional, {}, parametrosPost , auth);
};


// Hooks para la sección de comercio electrónico
export const apiEcommerceTools = (triggerApiCall, limit) => {
  const parametrosPost = { language_code:language_code, limit:limit };
  return ApiPost(triggerApiCall, API_ENDPOINTS.ecommerce.tools, {}, parametrosPost , auth  , "ecommerce");
};

export const apiEcommerceProducts = (triggerApiCall,product_id) => {
  const parametrosPost = { language_code:language_code, product_id:product_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.ecommerce.products, {}, parametrosPost , auth , "ecommerce");
};

// Hooks para la sección de eventos en vivo
export const apiLiveStream = (triggerApiCall) => {
  const parametrosPost = { language_code:language_code, last_hour:48};
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.stream, {}, parametrosPost , auth);
};


export const apiLiveCalendar = (triggerApiCall , time_zone , idCurso ) => {
  const parametrosPost = { language_code:language_code, time_zone:time_zone_global , course_id : idCurso };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.calendar, {}, parametrosPost , auth);
};

export const apiLiveMyCalendar = (triggerApiCall) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.myCalendar, {}, {} , auth);
};

export const apiLiveQuestions = (triggerApiCall,text,question_id,parentId,session_id) => {
  const parametrosPost = { text:text, question_id:question_id,parentId:parentId,session_id:session_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.questions, {}, parametrosPost , auth);
};

export const apiLiveQuestionsList = (triggerApiCall,channel_id,session_id) => {
  const parametrosPost = { language_code:language_code, channel_id:channel_id,session_id:session_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.questionsList, {}, parametrosPost , auth);
};

export const apiLiveMaterials = (triggerApiCall,channel_id) => {
  const parametrosPost = { language_code:language_code, channel_id:channel_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.materials, {}, parametrosPost , auth);
};

export const apiLiveSessionArchive = (triggerApiCall, channel_id) => {
  const parametrosPost = { language_code:language_code, channel_id:channel_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.sessionArchive, {}, parametrosPost , auth);
};

export const apiLiveStreaming = (triggerApiCall,channel_id) => {
  const parametrosPost = { channel_id:channel_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.streaming, {}, parametrosPost , auth);
};

export const apiLiveFavorites = (triggerApiCall,channel_id,session_id) => {
  const parametrosPost = { channel_id:channel_id,session_id:session_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.favorites, {}, parametrosPost , auth);
};

export const apiLiveRatingsSave = (triggerApiCall,rating,comment,session_id) => {
  const parametrosPost = { language_code:"ES", rating:rating,comment:comment,session_id:session_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.ratings.save, {}, parametrosPost , auth);
};

export const apiLiveRatings = (triggerApiCall,channel_id) => {
   const parametrosPost = { language_code:"ES", channel_id:channel_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.live.ratings.ratings, {}, parametrosPost , auth);
};

// Hooks para la sección de operaciones asíncronas
export const apiAsyncRatings = (triggerApiCall, course_id) => {
  const parametrosPost = { language_code:"ES", course_id:course_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.ratings, {}, parametrosPost , auth);
};

export const apiAsyncCoursesModules = (triggerApiCall, course_id ) => {
  const parametrosPost = { language_code:language_code, course_id:course_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.coursesModules, {}, parametrosPost , auth);
};

export const apiAsyncCoursesContent = (triggerApiCall,lesson_id) => {
  const parametrosPost = { language_code:language_code_modules, lesson_id:lesson_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.coursesContent, {}, parametrosPost , auth);
};

export const apiAsyncSaveRatingCourse = (triggerApiCall,rating ,comment,lesson_id) => {
  const parametrosPost = { language_code:"ES", rating :rating ,comment:comment,lesson_id:lesson_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.saveRatingCourse, {}, parametrosPost , auth);
};

export const apiAsyncMaterialCourse = (triggerApiCall,course_id) => {
  const parametrosPost = { language_code:language_code_modules,course_id:course_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.materialCourse, {}, parametrosPost , auth);
};

export const apiAsyncTeacherFavorite = (triggerApiCall) => {
  const parametrosPost = { language_code:language_code };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.teacherFavorite, {}, parametrosPost , auth);
};

export const apiAsyncCalendarAdd = (triggerApiCall,channel_id) => {
  const parametrosPost = { channel_id:channel_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.calendarAdd, {}, parametrosPost , auth);
};

export const apiAsyncCalendarList = (triggerApiCall , time_zone) => {
  const parametrosPost = { language_code:language_code,time_zone:time_zone_global };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.calendarList, {}, parametrosPost , auth);
};

export const apiAsyncCalendarRemove = (triggerApiCall,session_id) => {
  const parametrosPost = { session_id:session_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.async.calendarRemove, {}, parametrosPost , auth);
};

export const apiSyncRatingEducator = (triggerApiCall,rate_id) => {
  const parametrosPost = { rate_id:rate_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.sync.ratingEducator, {}, parametrosPost , auth);
};

export const apiSyncUploadMaterialEducator = (triggerApiCall,channel_id, file_base64, file_extension, material_name,session_id ) => {
  const parametrosPost = { channel_id:channel_id,file_base64:file_base64, file_extension:file_extension, material_name:material_name, session_id:session_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.sync.uploadMaterialEducator, {}, parametrosPost , auth);
};

export const apiSyncDeleteMaterialEducator = (triggerApiCall, channel_id, file_ids) => {
  const parametrosPost = { channel_id:channel_id, file_ids:file_ids };
  return ApiPost(triggerApiCall, API_ENDPOINTS.sync.deleteMaterialEducator, {}, parametrosPost , auth);
};

export const apiSyncEditVideoEducator = (triggerApiCall, image_base64,tag_id, playlist_id,video_title, video_description,video_id,recorded_date) => {
  const parametrosPost = { video_id:video_id, image_base64:image_base64, tag_id:tag_id, playlist_id:playlist_id, video_title:video_title, video_description:video_description, recorded_date:recorded_date };
  return ApiPost(triggerApiCall, API_ENDPOINTS.sync.editVideoEducator, {}, parametrosPost , auth);
};

export const apiSyncQuestionRemove = (triggerApiCall, question_id) => {
  const parametrosPost = { question_id:question_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.sync.questionRemove, {}, parametrosPost , auth);
};

export const apiSyncDisableVideo = (triggerApiCall, video_id) => {
  const parametrosPost = { video_id:video_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.sync.disableVideo, {}, parametrosPost , auth);
};

export const apiSyncUpsertPlaylist = (triggerApiCall, channel_id,video_id, playlist_id, playlist_name) => {
  const parametrosPost = { channel_id:channel_id, video_id:video_id, playlist_id:playlist_id, playlist_name:playlist_name };
  return ApiPost(triggerApiCall, API_ENDPOINTS.sync.upsertPlaylist, {}, parametrosPost , auth);
};

     

// Hooks para la sección de ayuda
export const apiHelpFaq = (triggerApiCall) => {
  const parametrosPost = { language_code:language_code,service_id:1 };
  return ApiPost(triggerApiCall, API_ENDPOINTS.help.faq, {}, parametrosPost , auth);
};

export const apiHelpReels = (triggerApiCall) => {
  const parametrosPost = { language_code:language_code,service_id:1 };
  return ApiPost(triggerApiCall, API_ENDPOINTS.help.reels, {}, parametrosPost , auth);
};

export const apiHelpContactRegister = (triggerApiCall,first_name,last_name,email,phone,academy,query_type,message,terms_accepted) => {
  const parametrosPost = { service_id:1,first_name:first_name,last_name:last_name,email:email,phone:phone,academy:academy,query_type:query_type,message:message,terms_accepted:terms_accepted,language:language_code };
  return ApiPost(triggerApiCall, API_ENDPOINTS.help.contactRegister, {}, parametrosPost , auth);
};

export const apiBinanceGetOrder = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.checkout.binance.order , {}, parameters,auth,"ecommerce");
}

export const apiBinanceGetStatus = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.checkout.binance.state , {}, parameters,auth,"ecommerce");
}

export const apiNuveiGetOrder = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.checkout.nuvei.order , {}, parameters,auth);
}

export const apiYunoCliente = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.checkout.yuno.client , {}, parameters,auth,"ecommerce");
}

export const apiYunoSesion = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.checkout.yuno.session , {}, parameters,auth,"ecommerce");
}

export const apiYunoPay = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.checkout.yuno.pay , {}, parameters,auth,"ecommerce");
}


export const apiShopCartGet = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.shop.cart.get , {}, parameters,auth,"ecommerce");
}

export const apiShopOrderSet = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.shop.order.set , {}, parameters,auth,"ecommerce");
}

export const apiShopOrderGet = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.shop.order.get , {}, parameters,auth,"ecommerce");
}

export const apiShopItemDelete = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.shop.cart.item.delete , {}, parameters,auth,"ecommerce");
}

export const apiShopItemAdd = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.shop.cart.item.add , {}, parameters,auth,"ecommerce");
}

export const apiShopItemDirect= (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.shop.cart.item.direct , {}, parameters,auth,"ecommerce");
}

export const apiLiveSaleGet = (triggerApiCall,channel_id) => {
  const parametrosPost = {language_code:language_code,channel_id:channel_id};
  return ApiPost(triggerApiCall, API_ENDPOINTS.sale.get, {}, parametrosPost,auth,"ecommerce");
  
}

export const apiLiveSaleSet = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.sale.set, {}, parameters,auth,"ecommerce");
  
}

export const apiLiveSaleDeactivate = (triggerApiCall,parameters) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.sale.deactivate, {}, parameters,auth,"ecommerce");
  
}

export const apiLiveSaleTools = (triggerApiCall) => {
  const parametrosPost = {language_code:language_code};
  return ApiPost(triggerApiCall, API_ENDPOINTS.sale.tools, {}, parametrosPost,auth,"ecommerce");
  
}


export const apiSupportNotifications = (triggerApiCall,limit,page_number) => {
  const parametrosPost = {limit:limit,page_number:page_number,language_code:language_code};
  return ApiPost(triggerApiCall, API_ENDPOINTS.support.notifications, {}, parametrosPost,auth);
  
}


export const apiSupportTimeZone = (triggerApiCall) => {
  return ApiPost(triggerApiCall, API_ENDPOINTS.support.timeZone, {}, {},auth);
  
}




/*

Gamificacion

*/


export const apiObtenerInfoNivelUsuario = (triggerApiCall) => {
  const parametrosPost = { language_code:language_code };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.userLevel, {}, parametrosPost , auth);
};

export const apiObtenerAvatares = (triggerApiCall) => {
  const parametrosPost = { language_code:language_code };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.listAvatar, {}, parametrosPost , auth);
};

export const apiEstablecerAvatarUsuario = (triggerApiCall , avatar_id ) => {
  const parametrosPost = { language_code:language_code , avatar_id:avatar_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.userAvatarSave, {}, parametrosPost , auth);
};


export const apiObtenerTitulos = (triggerApiCall  ) => {
  const parametrosPost = { language_code:language_code };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.listTitle, {}, parametrosPost , auth);
};

export const apiEstablecerTituloUsuario = (triggerApiCall , title_id ) => {
  const parametrosPost = {language_code:language_code , title_id:title_id };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.userTitle, {}, parametrosPost , auth);
};


export const apiObtenerGrupos = (triggerApiCall , avatar_id ) => {
  const parametrosPost = { language_code:language_code };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.avatarLevelNext, {}, parametrosPost , auth);
};

export const apiObtenerLogros = (triggerApiCall , limit, return_all_if_no_user ) => {
  const parametrosPost = { language_code:language_code, limit:limit ,return_all_if_no_user:return_all_if_no_user };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.avatarLevelNext, {}, parametrosPost , auth);
};

export const apiUserAchievementDetail = (triggerApiCall, group_id, unlocked_only ) => {
  const parametrosPost = { language_code:language_code, group_id:group_id ,unlocked_only:unlocked_only };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.userAchievementDetail, {}, parametrosPost , auth);
};

export const apiUserAchievementRecent = (triggerApiCall, limit ) => {
  const parametrosPost = { language_code:language_code, limit:limit };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.userAchievementRecent, {}, parametrosPost , auth);
};

export const apiGamificationGlobal = (triggerApiCall, limit_last_achievement ) => {
  const parametrosPost = { language_code:language_code, limit_last_achievement:limit_last_achievement };
  return ApiPost(triggerApiCall, API_ENDPOINTS.gamification.gamificationGlobal, {}, parametrosPost , auth);
};
