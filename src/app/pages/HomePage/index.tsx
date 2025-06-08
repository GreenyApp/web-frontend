import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card';
import DeviceCard from '../../../components/DeviceCard';
import { useDeviceStore } from '../../../store/deviceStore';
import {
    SectionHeader,
    Grid,
    OverviewCardContent,
    TotalDevicesValue,
    WarningText,
    SeedlingIcon,
    WarningIcon,
    LightbulbIcon,
} from './styles';
import Button from '../../../components/Button';
import { FaInfoCircle } from 'react-icons/fa';

const HomePage: React.FC = () => {
    const { devices, fetchDevices, isLoading, error } = useDeviceStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    // Find a device with low water (example warning)
    const lowWaterDevice = devices.find(d => d.waterLevel !== undefined && d.waterLevel < 30);

    const handleDetailsClick = (deviceId: number) => {
        navigate('/devices');
        console.log("Show details for device:", deviceId);
    };

    if (isLoading && devices.length === 0) return <p>Завантаження даних...</p>;
    if (error) return <p>Помилка завантаження: {error}</p>;

    return (
        <div>
            <SectionHeader>Огляд системи</SectionHeader>
            <Grid>
                <Card>
                    <OverviewCardContent>
                        <h3><SeedlingIcon /> Загальна кількість пристроїв</h3>
                        <TotalDevicesValue>{devices.length}</TotalDevicesValue>
                    </OverviewCardContent>
                </Card>
                <Card>
                    <OverviewCardContent>
                        <h3><WarningIcon /> Попередження</h3>
                        {lowWaterDevice ? (
                            <WarningText>Низький рівень води ({lowWaterDevice.name})</WarningText>
                        ) : (
                            <p>Все в нормі.</p>
                        )}
                    </OverviewCardContent>
                </Card>
                <Card>
                    <OverviewCardContent>
                        <h3><LightbulbIcon /> Порада</h3>
                        <p>Пил на листках може заважати рослині дихати та поглинати світло — періодично протирайте листя м’якою тканиною.</p>
                    </OverviewCardContent>
                </Card>
            </Grid>

            <SectionHeader>Швидкий статус</SectionHeader>
            {devices.length > 0 ? (
                <Grid>
                    {devices.slice(0, 3).map((device) => ( // Show first 3 for quick status
                        <DeviceCard key={device.id} device={device} showFullDetails={false}>
                            {/* Override default actions for homepage card if needed */}
                            <Button
                                onClick={() => handleDetailsClick(device.id)}
                                icon={<FaInfoCircle />}
                                style={{marginTop: '15px'}} // Add some margin for the button
                            >
                                Детальніше
                            </Button>
                        </DeviceCard>
                    ))}
                </Grid>
            ) : (
                <p>Пристроїв не знайдено. Додайте новий пристрій на сторінці "Мої пристрої".</p>
            )}
        </div>
    );
};

export default HomePage;