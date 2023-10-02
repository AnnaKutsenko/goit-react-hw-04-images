import React, { Component } from 'react';
import { GalleryWrap, GalleryImg } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };
    
    toogleModal = () => {
        this.setState(prevState => ({ showModal: !prevState.showModal }))
    };

    render() {
        const { image } = this.props;
        const { showModal } = this.state;

        return (
            <>
                <GalleryWrap onClick={this.toogleModal}>
                    <GalleryImg src={image.webformatURL} alt={image.tags} />
                </GalleryWrap>
                {showModal && <Modal image={image} onClose={this.toogleModal} />}
            </>
        );
    }
}
