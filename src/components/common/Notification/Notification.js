import React from 'react';

const Notification = ({title, description, icon, closeIcon}) => {
    const Icon = icon;
    const CloseIcon = closeIcon;
    return (
        <div className="flex items-center justify-between bg-white border-l-4 border-blue-500 text-black px-4 py-3 shadow-md rounded-lg" role="alert">
            <div className="flex items-center">
                <Icon className="fill-current w-6 h-6 mr-4" padding="0"/>
                <p>
                    <strong className="font-bold">{title}</strong>
                    <span className="block sm:inline"> {description} </span>
                </p>
            </div>
            <button className="text-black text-sm py-1 px-2">
                <CloseIcon className="fill-current w-6 h-6 mr-4" padding="0"/>
            </button>
        </div>
    );
};

export default Notification;
