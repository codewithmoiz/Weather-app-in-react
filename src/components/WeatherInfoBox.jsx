import React from 'react';

const WeatherInfoBox = ({ icon, value, label, className }) => {
    return (
        <div className={`info-box ${className}`}>
            {icon}
            <div>
                <h3>{value}</h3>
                <p>{label}</p>
            </div>
        </div>
    );
};

export default WeatherInfoBox;