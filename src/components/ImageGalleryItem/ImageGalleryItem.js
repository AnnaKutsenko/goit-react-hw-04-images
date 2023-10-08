import { useState } from 'react';
import { GalleryWrap, GalleryImg } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({image}) => {
    const [showModal, setShowModal] = useState(false);
    
    const toogleModal = () => {
        setShowModal( prevShowModal=> !prevShowModal )
    };

    return (
        <>
            <GalleryWrap onClick={toogleModal}>
                <GalleryImg src={image.webformatURL} alt={image.tags} />
            </GalleryWrap>
            {showModal && <Modal image={image} onClose={toogleModal} />}
        </>
    );
}
