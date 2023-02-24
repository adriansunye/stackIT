import ReactDom from 'react-dom';
import React from 'react';
import { Container } from '@mui/material';

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
};

const MODAL_STYLES = {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'all 300ms ease',
    backgroundColor: 'black',
    overflowY: 'scroll',
    zIndex: 1000,
};


const AdvertisementModal = ({
    openAdvertisementModal,
    setOpenAdvertisementModal,
    children,
}) => {
    if (!openAdvertisementModal) return null;
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} onClick={() => setOpenAdvertisementModal(false)} />
            <Container
                maxWidth='sm'
                sx={{ p: '2rem 1rem', borderRadius: 1 }}
                style={MODAL_STYLES}
            >
                {children}
            </Container>
        </>,
        document.getElementById('advertisement-modal')
    );
};

export default AdvertisementModal;
