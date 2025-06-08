import React, { useEffect } from 'react';
import Button from '../../../components/Button';
import DeviceCard from '../../../components/DeviceCard';
import { useDeviceStore } from '../../../store/deviceStore';
import { useUIStore } from '../../../store/uiStore';
import { PageHeader, PageTitle, Grid, EmptyStateContainer } from './styles';
import { FaPlus, FaBoxOpen } from 'react-icons/fa'; // Icons for button and empty state

const DevicesPage: React.FC = () => {
    const { devices, fetchDevices, isLoading, error } = useDeviceStore();
    const { openDeviceModal } = useUIStore();

    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    const handleAddDevice = () => {
        openDeviceModal('add');
    };

    if (isLoading && devices.length === 0) return <p>Завантаження пристроїв...</p>;
    if (error) return <p>Помилка завантаження пристроїв: {error}</p>;

    return (
        <div>
            <PageHeader>
                <PageTitle>Мої пристрої</PageTitle>
                <Button onClick={handleAddDevice} icon={<FaPlus />}>
                    Додати пристрій
                </Button>
            </PageHeader>

            {devices.length > 0 ? (
                <Grid>
                    {devices.map((device) => (
                        <DeviceCard key={device.id} device={device} showFullDetails={true} />
                    ))}
                </Grid>
            ) : (
                <EmptyStateContainer>
                    <FaBoxOpen />
                    <p>У вас ще немає пристроїв.</p>
                    <Button onClick={handleAddDevice} icon={<FaPlus />}>
                        Додати перший пристрій
                    </Button>
                </EmptyStateContainer>
            )}
        </div>
    );
};

export default DevicesPage;