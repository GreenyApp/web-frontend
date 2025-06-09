import React, { useState, useEffect, type FormEvent } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import { useUIStore } from '../../store/uiStore';
import { useDeviceStore } from '../../store/deviceStore';

const DeviceFormModal: React.FC = () => {
    const {
        isDeviceModalOpen,
        closeDeviceModal,
        deviceModalMode,
        deviceToEditId,
    } = useUIStore();
    const { addDevice, getDeviceById, devices, isLoading: deviceLoading, updateDeviceName } = useDeviceStore();

    const [deviceName, setDeviceName] = useState('');
    const [deviceCode, setDeviceCode] = useState('');
    const [currentDeviceId, setCurrentDeviceId] = useState<number | null>(null);

    useEffect(() => {
        if (isDeviceModalOpen && deviceModalMode === 'edit' && deviceToEditId) {
            const device = getDeviceById(deviceToEditId);
            if (device) {
                setDeviceName(device.name || '');
                setDeviceCode(device.code || ''); 
                setCurrentDeviceId(device.id);
            } else {
                console.error("Device to edit not found:", deviceToEditId);
                useUIStore.getState().showNotification("Пристрій для редагування не знайдено", "error");
                closeDeviceModal();
            }
        } else {
            setDeviceName('');
            setDeviceCode('');
            setCurrentDeviceId(null);
        }
    }, [isDeviceModalOpen, deviceModalMode, deviceToEditId, getDeviceById, devices, closeDeviceModal]); 

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!deviceName.trim()) { 
            useUIStore.getState().showNotification("Назва пристрою обов'язкова!", "error");
            return;
        }
        if (deviceModalMode === 'add' && !deviceCode.trim()) {
            useUIStore.getState().showNotification("Код пристрою обов'язковий для додавання!", "error");
            return;
        }


        let success = false;
        if (deviceModalMode === 'add') {
            const newDevice = await addDevice({ name: deviceName, code: deviceCode });
            success = !!newDevice;
        } else if (deviceModalMode === 'edit' && currentDeviceId) {
            success = await updateDeviceName(currentDeviceId, deviceName);
        }

        if (success) {
            closeDeviceModal();
        }
    };

    const modalTitle = deviceModalMode === 'add' ? 'Додати пристрій' : 'Редагувати пристрій';

    return (
        <Modal
            isOpen={isDeviceModalOpen}
            onClose={closeDeviceModal}
            title={modalTitle}
            footerActions={
                <>
                    <Button variant="outline" onClick={closeDeviceModal} disabled={deviceLoading}>
                        Скасувати
                    </Button>
                    <Button onClick={handleSubmit} disabled={deviceLoading}>
                        {deviceLoading ? 'Збереження...' : 'Зберегти'}
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit}> 
                <Input
                    label="Назва пристрою"
                    id="deviceNameModal" 
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    required
                    disabled={deviceLoading}
                />
                <Input
                    label="Код пристрою"
                    id="deviceCodeModal" 
                    value={deviceCode}
                    onChange={(e) => setDeviceCode(e.target.value)}
                    required={deviceModalMode === 'add'} 
                    disabled={deviceLoading || deviceModalMode === 'edit'} 
                />
                <button type="submit" style={{ display: 'none' }} disabled={deviceLoading}></button>
            </form>
        </Modal>
    );
};

export default DeviceFormModal;