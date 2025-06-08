import React from 'react';
import { useTheme } from 'styled-components';
import { GaugeContainer, GaugeFill } from './styles';

interface GaugeProps {
    value: number; // Percentage 0-100
    type: 'water' | 'soilHumidity' | 'airHumidity' | 'light' | 'airQuality' | 'temperature'; // Temperature might not be a gauge
}

const Gauge: React.FC<GaugeProps> = ({ value, type }) => {
    const theme = useTheme();
    let color = theme.colors.info; // Default

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
        case 'airQuality': // Assuming higher % is better
            color = theme.colors.success;
            break;
        // 'temperature' might be displayed differently, not as a typical 0-100 gauge
    }

    const percentage = Math.max(0, Math.min(100, value)); // Clamp value

    return (
        <GaugeContainer>
            <GaugeFill percentage={percentage} color={color} />
        </GaugeContainer>
    );
};

export default Gauge;