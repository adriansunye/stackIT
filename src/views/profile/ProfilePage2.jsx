import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import CardAdvertisement from '@/components/layout/cards/CardAdvertisement';
import Message from '@/components/layout/messages/Message';
import Search from '@/components/navigation/search/Search';
import { useAdvertisementContext } from '@/services/providers/AdvertisementContextProvider';
import useHandleError from '@/services/hooks/useHandleError';
import { HolidayVillage } from '@mui/icons-material';
import { useAuthUserContext } from '@/services/providers/AuthUserContextProvider';
import FullScreenLoader from '@/components/loaders/FullScreenLoader';
import { useQuery } from '@tanstack/react-query';
import { getMyAdvertisementsFn } from '@/api/advertisementsApi';


const ProfilePage = () => {
  /* A hook that is used to get the advertisements from the database. */
  const [query, setQuery] = useState(null);
  const authUserContext = useAuthUserContext()
  const authUser = authUserContext.state.user

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

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <Box sx={{ m: 1, pb: 8, px: 3, backgroundColor: "background.default" }}>
      <Grid container>
        <Grid
          item
          md={2}
        />
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
    </Box>
  );
};

export default ProfilePage;
