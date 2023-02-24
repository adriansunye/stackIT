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
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';


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

const CardPublic = ({ advertisement }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <>
            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ minWidth: 300 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        title={advertisement.name}
                        subheader={advertisement.category}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://femcoders.factoriaf5.org/wp-content/uploads/2021/12/factoria-web.png"
                        alt="Image for advertisement"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {advertisement.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="call me">
                            <LocalPhoneIcon />
                        </IconButton>
                        <IconButton aria-label="send me a email">
                            <EmailIcon />
                        </IconButton>
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
                            <Typography paragraph>
                                {advertisement.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        </>
    );
};

export default CardPublic