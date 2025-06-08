import React, { type ReactNode } from 'react';
import type { Product } from '../../types/product';
import Button from '../Button';
import Gauge from '../Gauge';
import { useDeviceStore } from '../../store/deviceStore';
import { useUIStore } from '../../store/uiStore';
import {
    StyledDeviceCard,
    DeviceHeader,
    DeviceTitle,
    DeviceInfo,
    InfoItem,
    InfoLabel,
    InfoValue,
    DeviceActions,
    InfoGaugeWrapper,
    InfoItemWithGauge,
} from './styles';
import { FaTint, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa'; // Example icons
import { useNavigate } from 'react-router-dom';

interface DeviceCardProps {
    device: Product;
    showFullDetails?: boolean;
    children?: ReactNode; // To differentiate between homepage summary and devices page detail
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, showFullDetails = false }) => {
    const { waterDevice } = useDeviceStore();
    const { openDeviceModal, openDeleteModal } = useUIStore();
    const navigate = useNavigate();


    const handleWater = () => {
        waterDevice(device.id);
    };

    const handleEdit = () => {
        openDeviceModal('edit', device.id);
    };

    const handleDelete = () => {
        openDeleteModal(device.id);
    };

    return (
        <StyledDeviceCard
            header={
                <DeviceHeader>
                    <DeviceTitle>{device.name || 'Unnamed Device'}</DeviceTitle>
                    {/* Status indicator can be added here if backend provides online/offline status */}
                </DeviceHeader>
            }
        >
            <DeviceInfo>
                {showFullDetails && (
                    <InfoItem>
                        <InfoLabel>Код пристрою</InfoLabel>
                        <InfoValue>{device.code}</InfoValue>
                    </InfoItem>
                )}

                {device.waterLevel !== undefined && (
                    <InfoItemWithGauge>
                        <InfoLabel>Рівень води</InfoLabel>
                        <InfoValue>{device.waterLevel}%</InfoValue>
                        <InfoGaugeWrapper><Gauge value={device.waterLevel} type="water" /></InfoGaugeWrapper>
                    </InfoItemWithGauge>
                )}
                {device.soilHumidity !== undefined && (
                    <InfoItemWithGauge>
                        <InfoLabel>Вологість ґрунту</InfoLabel>
                        <InfoValue>{device.soilHumidity}%</InfoValue>
                        <InfoGaugeWrapper><Gauge value={device.soilHumidity} type="soilHumidity" /></InfoGaugeWrapper>
                    </InfoItemWithGauge>
                )}
                {device.airHumidity !== undefined && (
                     <InfoItemWithGauge>
                        <InfoLabel>Вологість повітря</InfoLabel>
                        <InfoValue>{device.airHumidity}%</InfoValue>
                        <InfoGaugeWrapper><Gauge value={device.airHumidity} type="airHumidity" /></InfoGaugeWrapper>
                    </InfoItemWithGauge>
                )}
                {device.temperature !== undefined && (
                    <InfoItem>
                        <InfoLabel>Температура</InfoLabel>
                        <InfoValue>{device.temperature}°C</InfoValue>
                        {/* Temperature might not need a gauge like others */}
                    </InfoItem>
                )}
                {showFullDetails && device.lightLevel !== undefined && (
                    <InfoItemWithGauge>
                        <InfoLabel>Рівень освітлення</InfoLabel>
                        <InfoValue>{device.lightLevel}%</InfoValue>
                        <InfoGaugeWrapper><Gauge value={device.lightLevel} type="light" /></InfoGaugeWrapper>
                    </InfoItemWithGauge>
                )}
                {showFullDetails && device.airQualityValue !== undefined && (
                    <InfoItemWithGauge>
                        <InfoLabel>Якість повітря</InfoLabel>
                        <InfoValue>{device.airQualityText || 'N/A'} ({device.airQualityValue})</InfoValue>
                        {/* Assuming airQualityValue is a percentage for the gauge */}
                        <InfoGaugeWrapper><Gauge value={device.airQualityValue} type="airQuality" /></InfoGaugeWrapper>
                    </InfoItemWithGauge>
                )}
            </DeviceInfo>
            <DeviceActions>
                <Button variant="outline" onClick={handleWater} icon={<FaTint />}>Полити</Button>
                {showFullDetails ? (
                    <>
                        <Button variant="outline" onClick={handleEdit} icon={<FaEdit />}>Змінити</Button>
                        <Button variant="danger" onClick={handleDelete} icon={<FaTrash />} aria-label="Видалити" children={undefined} />
                    </>
                ) : (
                    <Button  onClick={() => navigate(`/devices`)} icon={<FaInfoCircle />}>Детальніше</Button>
                )}
            </DeviceActions>
        </StyledDeviceCard>
    );
};

export default DeviceCard;