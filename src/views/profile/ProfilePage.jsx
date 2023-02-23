import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Box } from '@mui/material';

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

export default function ProfilePage() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
        display="flex" 
        justifyContent={'center'}
      >
      <Box m="auto">
        
    <Card sx=    {{ maxWidth: 300, bgcolor: "#F2A157" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#F2A157" }}>
            GG
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Gabriel Gonzalez"
        subheader="Full Stack Developer"
        
      />
      <CardMedia
        component="img"
        height="270"
        image="src/assets/img6.jpg"
        alt="Foto perfil"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Ubicación: Asturias, España. <br/>
        Modalidad: Remota. <br/>
        Duracion del proyecto: <br/>
        Preferencia. 1 semana ≤ 1 mes
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="mail">
        <EmailIcon />
        </IconButton>
        <IconButton aria-label="phone">
          <PhoneAndroidIcon />
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
          <Typography paragraph>Sobre mí:</Typography>
          <Typography paragraph>
          Soy un desarrollador que trabaja tanto 
        en el front-end como en el back-end de un sitio web, 
        software o aplicación
          </Typography>
          <Typography paragraph>
           Habilidades: <br/>
           </Typography>
           <Typography paragraph>
           HTML5: Experto. <br/>
           CSS: Experto. <br/>
           JavaScript: Experto. <br/>
           React js: Experto. <br/>
           Java: Experto. <br/>
           SQL: Experto. <br/>
           
          </Typography>
          <Typography paragraph>
            Experiencia: <br/>
            </Typography>
            <Typography paragraph>
            INTA (Instituto Nacional de Técnica Aeroespacial) <br/>
            Implementación en aplicación Portus (https://portus.puertos.es) de nuevas funcionalidades 
            para la visualización de imágenes satelitales de la temperatura del agua. <br/> 
            </Typography>
            <Typography paragraph>
            Aubay - Aubay <br/>
            Arquitectura y desarrollo de portal de aplicaciones SPA para la administración 
            de varios operadores de telecomunicaciones. <br/>
          </Typography>
          <Typography paragraph>
          Tarifa aproximada: <br/>
          </Typography>
          <Typography paragraph>
          290€/dia
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Box>
  </Box>
    );
  }
