import React from 'react';
import { useTheme } from 'styled-components';
import { GaugeContainer, GaugeFill } from './styles';

interface GaugeProps {
    value: number; 
    type: 'water' | 'soilHumidity' | 'airHumidity' | 'light' | 'airQuality' | 'temperature'; 
}

const Gauge: React.FC<GaugeProps> = ({ value, type }) => {
    const theme = useTheme();
    let color = theme.colors.info; 

    switch (type) {
        case 'water':
            color = theme.colors.info;
            break;
        case 'soilHumidity':
            color = theme.colors.secondary;
            break;
        case 'airHumidity':
            color = theme.colors.primaryLight;
            break;
        case 'light':
            color = theme.colors.warning;
            break;
        case 'airQuality':
            color = theme.colors.success;
            break;
    }

    const percentage = Math.max(0, Math.min(100, value));

    return (
        <GaugeContainer>
            <GaugeFill percentage={percentage} color={color} />
        </GaugeContainer>
    );
};

export default Gauge;