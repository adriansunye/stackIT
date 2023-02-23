import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
    IconButton,
    Box,
    Avatar,
    Collapse,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Tooltip,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateAdvertisement from '@/components/modals/UpdateAdvertisement';
import AdvertisementModal from '@/components/modals/AdvertisementModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAdvertisementFn } from '@/api/advertisementsApi';
import { useAuthUserContext } from '@/services/providers/AuthUserContextProvider';
import InfoIcon from '@mui/icons-material/Info';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SettingsMenu from '@/components/modals/SettingsMenu';

const SERVER_ENDPOINT = import.meta.env.VITE_REACT_APP_SERVER_ENDPOINT;

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardAdvertisement = ({ advertisement }) => {
    const authUserContext = useAuthUserContext();
    const user = authUserContext.state.authUser;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const can = (permission) =>
        (user?.permissions).find((p) => p === permission) ? true : false;

    const queryClient = useQueryClient();
    const [openAdvertisementModal, setOpenAdvertisementModal] = useState(false);

    const { mutate: deleteAdvertisement } = useMutation((id) => deleteAdvertisementFn(id), {
        onSuccess(data) {
            queryClient.invalidateQueries('advertisement');
            toast.success('Advertisement deleted successfully');
        },
        onError(error) {
            if (Array.isArray((error).data.error)) {
                (error).data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error).data.message, {
                    position: 'top-right',
                });
            }
        },
    });

    const onDeleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            deleteAdvertisement(id);
        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Grid item xs={12} md={6} lg={4}>
                <Card >
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                <FileCopyIcon />
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={handleSettingsClick} aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        titleTypographyProps={{ variant: 'body2' }}
                        subheaderTypographyProps={{ variant: 'subtitle2' }}
                        title={advertisement.category}
                        subheader={advertisement.name}
                    />
                    <SettingsMenu 
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        setOpenAdvertisementModal={setOpenAdvertisementModal} 
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Tags
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Tooltip title="Demana més informació" placement="bottom">
                            <IconButton aria-label="Demana més informació">
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Posat en contacte amb nosaltres" placement="bottom">
                            <IconButton aria-label="Posat en contacte amb nosaltres utilitzant Whatsapp">
                                <WhatsAppIcon />
                            </IconButton>
                        </Tooltip>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{advertisement.description}</Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
            <AdvertisementModal
                openAdvertisementModal={openAdvertisementModal}
                setOpenAdvertisementModal={setOpenAdvertisementModal}
            >
                <UpdateAdvertisement setOpenAdvertisementModal={setOpenAdvertisementModal} advertisement={advertisement} />
            </AdvertisementModal>
        </>
    );
};

export default CardAdvertisement;