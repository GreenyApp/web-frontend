// src/components/DeviceFormModal/index.tsx
import React, { useState, useEffect, type FormEvent } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import { useUIStore } from '../../store/uiStore';
import { useDeviceStore } from '../../store/deviceStore';
// Product type import might not be needed here if not directly used

const DeviceFormModal: React.FC = () => {
    const {
        isDeviceModalOpen,
        closeDeviceModal,
        deviceModalMode,
        deviceToEditId,
    } = useUIStore();
    const { addDevice, getDeviceById, devices, isLoading: deviceLoading, updateDeviceName } = useDeviceStore(); // Added updateDeviceName

    const [deviceName, setDeviceName] = useState('');
    const [deviceCode, setDeviceCode] = useState('');
    const [currentDeviceId, setCurrentDeviceId] = useState<number | null>(null);

    useEffect(() => {
        if (isDeviceModalOpen && deviceModalMode === 'edit' && deviceToEditId) {
            const device = getDeviceById(deviceToEditId);
            if (device) {
                setDeviceName(device.name || '');
                setDeviceCode(device.code || ''); // Keep setting code for display
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
    }, [isDeviceModalOpen, deviceModalMode, deviceToEditId, getDeviceById, devices, closeDeviceModal]); // Added closeDeviceModal to dependencies

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!deviceName.trim()) { // Only name is required for edit, code is not editable via this form
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
            // Notification is handled within updateDeviceName
        }

        if (success) {
            closeDeviceModal();
        }
        // Error notifications are handled within the store actions
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
            <form onSubmit={handleSubmit}> {/* Make sure this form tag is present */}
                <Input
                    label="Назва пристрою"
                    id="deviceNameModal" // Changed ID to avoid conflict with other inputs
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    required
                    disabled={deviceLoading}
                />
                <Input
                    label="Код пристрою"
                    id="deviceCodeModal" // Changed ID to avoid conflict
                    value={deviceCode}
                    onChange={(e) => setDeviceCode(e.target.value)}
                    required={deviceModalMode === 'add'} // Only required for add mode
                    disabled={deviceLoading || deviceModalMode === 'edit'} // Code is not editable
                />
                <button type="submit" style={{ display: 'none' }} disabled={deviceLoading}></button>
            </form>
        </Modal>
    );
};

export default DeviceFormModal;