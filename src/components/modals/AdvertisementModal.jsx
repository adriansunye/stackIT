import ReactDom from 'react-dom';
import React from 'react';
import { Container } from '@mui/material';

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
    zIndex: 1000,
};

const MODAL_STYLES = {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'all 300ms ease',
    backgroundColor: 'white',
    overflowY: 'scroll',
    zIndex: 1000,
};


const AdvertisementModal = ({
    openPostModal,
    setOpenPostModal,
    children,
}) => {
    if (!openPostModal) return null;
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} onClick={() => setOpenPostModal(false)} />
            <Container
                maxWidth='sm'
                sx={{ p: '2rem 1rem', borderRadius: 1 }}
                style={MODAL_STYLES}
            >
                {children}
            </Container>
        </>,
        document.getElementById('post-modal')
    );
};

export default AdvertisementModal;
