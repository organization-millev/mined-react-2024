import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Imports
import SubscriptionList from '../components/common/SubscriptionList/SubscriptionList';
import CourseRating from '../components/common/CourseRating/CourseRating';
// Icons
import CloseIcon from '../components/iconos/close';
import LiveIcon from '../components/iconos/icon_live';

// Images (png)
// const ProfilePhotoSrc = "/assets/images/educador-rosa-3.png";

const playground = () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route path="SubscriptionList" element={<SubscriptionList />} />
                <Route path="CourseRating" element={
                    <>
                        <CourseRating title="Valoraciones del curso" rating={4.7} />
                        <CourseRating title="Valoraciones del curso" rating={2.2} />
                    </>
                    } 
                />
            </Route>
        </Routes>
    );
};

export default playground;
