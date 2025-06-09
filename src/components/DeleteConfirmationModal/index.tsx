import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { useUIStore } from '../../store/uiStore';
import { useDeviceStore } from '../../store/deviceStore';
import styled from 'styled-components';

const ModalText = styled.p`
    margin-bottom: 10px;
    &:last-of-type {
        margin-bottom: 0;
    }
`;

const DeleteConfirmationModal: React.FC = () => {
    const { isDeleteModalOpen, closeDeleteModal, deviceToDeleteId } = useUIStore();
    const { deleteDevice, isLoading: deviceLoading } = useDeviceStore();

    const handleConfirmDelete = async () => {
        if (deviceToDeleteId) {
            const success = await deleteDevice(deviceToDeleteId);
            if (success) {
                closeDeleteModal();
            }
        }
    };

    return (
        <Modal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            title="Видалити пристрій"
            footerActions={
                <>
                    <Button variant="outline" onClick={closeDeleteModal} disabled={deviceLoading}>
                        Скасувати
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete} disabled={deviceLoading}>
                        {deviceLoading ? 'Видалення...' : 'Видалити'}
                    </Button>
                </>
            }
        >
            <ModalText>Ви впевнені, що хочете видалити цей пристрій зі свого списку?</ModalText>
            <ModalText>Ця дія оновить його статус на сервері (якщо це передбачено).</ModalText>
        </Modal>
    );
};

export default DeleteConfirmationModal;