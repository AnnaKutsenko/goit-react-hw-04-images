import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown )
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClose = e => {
        // console.log('Кликнули в бекдроп');
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }
    
    render() {
        const { image } = this.props;

        return createPortal(
            <Overlay onClick={this.handleBackdropClose} >
                <StyledModal>
                    <img src={image.largeImageURL} alt={image.tags} />
                </StyledModal>
            </Overlay>,
            modalRoot 
        );
    }
}