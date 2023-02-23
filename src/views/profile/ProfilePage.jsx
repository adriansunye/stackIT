import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import CardAdvertisement from '@/components/layout/cards/CardAdvertisement';
import Message from '@/components/layout/messages/Message';
import Search from '@/components/navigation/search/Search';
import { useAdvertisementContext } from '@/services/providers/AdvertisementContextProvider';
import useHandleError from '@/services/hooks/useHandleError';
import { HolidayVillage } from '@mui/icons-material';
import { useAuthUserContext } from '@/services/providers/AuthUserContextProvider';


const ProfilePage = () => {
  /* A hook that is used to get the advertisements from the database. */
  const [query, setQuery] = useState(null);
  const authUserContext = useAuthUserContext()
  const authUser = authUserContext.state.user
  const advertisements = authUserContext.state.authUser.advertisements[0].advertisements


  //If the string is greater than 0, set the query to the results. If not, set the query to null.

 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  /**
   * Sets anchor element to the event target and opens the popper.
   */
  const handleFilterClick =
    (newPlacement) =>
      (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

 
  return (
    <Box sx={{ m: 1, pb: 8, px: 3, backgroundColor: "background.default" }}>
        <Grid container>
          <Grid
            item
            md={2}
          />
          <Grid item container xs={12} spacing={2}>
            {advertisements.map((advertisement) => (
              <CardAdvertisement key={advertisement.id} advertisement={advertisement} />
            ))}
          </Grid>
        </Grid>
    </Box>
  );
};

export default ProfilePage;
