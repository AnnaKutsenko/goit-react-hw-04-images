import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, onClose }) => {

    useEffect(() => {
    const handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            onClose();
        }
    };
        
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    const handleBackdropClose = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleBackdropClose} >
            <StyledModal>
                <img src={image.largeImageURL} alt={image.tags} />
            </StyledModal>
        </Overlay>,
        modalRoot 
    );
}