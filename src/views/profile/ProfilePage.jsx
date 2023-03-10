import React, { useEffect, useState } from 'react';
import { styled, Collapse, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import CardAdvertisement from '@/components/layout/cards/CardAdvertisement';
import Message from '@/components/layout/messages/Message';
import Search from '@/components/navigation/search/Search';
import { useAdvertisementContext } from '@/services/providers/AdvertisementContextProvider';
import useHandleError from '@/services/hooks/useHandleError';
import { useAuthUserContext } from '@/services/providers/AuthUserContextProvider';
import FullScreenLoader from '@/components/loaders/FullScreenLoader';
import { useQuery } from '@tanstack/react-query';
import { getMyAdvertisementsFn } from '@/api/advertisementsApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdvertisementModal from '../../components/modals/AdvertisementModal';
import CreateAdvertisementModal from '../../components/modals/CreateAdvertisementModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

const ProfilePage = () => {
  /* A hook that is used to get the advertisements from the database. */
  const [query, setQuery] = useState(null);
  const authUserContext = useAuthUserContext()
  const authUser = authUserContext.state.authUser
console.log(authUser.user)
  const { isLoading, data: advertisements } = useQuery(['myAdvertisements'], () => getMyAdvertisementsFn(), {

    select: (data) => data.advertisements[0].advertisements,
    onError: (error) => {
      setOpenCourseModal(false);
      if (Array.isArray(error.response.data.error)) {
        error.data.error.forEach((el) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error(error.response.data.message, {
          position: 'top-right',
        });
      }
    },
  });


  /**
   * Sets anchor element to the event target and opens the popper.
   */
  const [expanded, setExpanded] = React.useState(false);
  const [openAdvertisementModal, setOpenAdvertisementModal] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <Box sx={{ m: 1, pb: 8, px: 3, pt: 3, backgroundColor: "background.default" }}>
      <Grid container gap={2}>
        <Grid
          item
          md={3}
        >

          <Card sx={{ minWidth: 350, bgcolor: "background.paper" }}>
            <CardHeader
              title={authUser.user.name}
              subheader="Full-Stack Developer"
            />
            <CardMedia
              component="img"
              height="270"
              image={!authUser.user.name === 'Gabriel Gonzalez' || !authUser.user.name === 'Adrian Sunye' ? "https://femcoders.factoriaf5.org/wp-content/uploads/2021/12/factoria-web.png" : `src/assets/${authUser.user.name}.jpg`}
              alt="Foto perfil"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Ubicaci??n: Asturias, Espa??a. <br />
                Modalidad: Remota. <br />
                Duracion del proyecto: <br />
                Preferencia. 1 semana ??? 1 mes
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={setOpenAdvertisementModal} aria-label="addCourse">
                <AddCircleIcon />
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
                <Typography paragraph>Sobre m??:</Typography>
                <Typography paragraph>
                  Soy un desarrollador que trabaja tanto
                  en el front-end como en el back-end de un sitio web,
                  software o aplicaci??n
                </Typography>
                <Typography paragraph>
                  Habilidades: <br />
                </Typography>
                <Typography paragraph>
                  HTML5: Experto. <br />
                  CSS: Experto. <br />
                  JavaScript: Experto. <br />
                  React js: Experto. <br />
                  Java: Experto. <br />
                  SQL: Experto. <br />

                </Typography>
                <Typography paragraph>
                  Experiencia: <br />
                </Typography>
                <Typography paragraph>
                  INTA (Instituto Nacional de T??cnica Aeroespacial) <br />
                  Implementaci??n en aplicaci??n Portus (https://portus.puertos.es) de nuevas funcionalidades
                  para la visualizaci??n de im??genes satelitales de la temperatura del agua. <br />
                </Typography>
                <Typography paragraph>
                  Aubay - Aubay <br />
                  Arquitectura y desarrollo de portal de aplicaciones SPA para la administraci??n
                  de varios operadores de telecomunicaciones. <br />
                </Typography>
                <Typography paragraph>
                  Tarifa aproximada: <br />
                </Typography>
                <Typography paragraph>
                  290???/dia
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid
          item
          sm={8}
        >
          {advertisements?.length === 0 || query?.length === 0 ? (
            <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
              <Message type='info' title='Info'>
                No advertisements in your profile
              </Message>
            </Box>
          ) : (
            <Grid item container xs={12} spacing={2}>

              {advertisements?.map((advertisement) => (
                <CardAdvertisement key={advertisement.id} advertisement={advertisement} />
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
      <AdvertisementModal
        openAdvertisementModal={openAdvertisementModal}
        setOpenAdvertisementModal={setOpenAdvertisementModal}
      >
        <CreateAdvertisementModal setOpenAdvertisementModal={setOpenAdvertisementModal} />
      </AdvertisementModal>
    </Box>
  );
};

export default ProfilePage;
