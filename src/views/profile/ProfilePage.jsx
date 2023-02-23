import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import FullScreenLoader from '@/components/loaders/FullScreenLoader';
import CardAdvertisement from '@/components/layout/cards/CardAdvertisement';
import Message from '@/components/layout/messages/Message';
import Search from '@/components/navigation/search/Search';
import { useAdvertisementContext } from '@/services/providers/AdvertisementContextProvider';
import useHandleError from '@/services/hooks/useHandleError';
import { getAllAdvertisementsFn } from '@/api/advertisementsApi';
import { HolidayVillage } from '@mui/icons-material';

const ProfilePage = () => {
  /* A hook that is used to get the advertisements from the database. */
  const advertisementContext = useAdvertisementContext();
  const [query, setQuery] = useState(null);
  const { isLoading, data: advertisements } = useQuery(['advertisements'], () => getAllAdvertisementsFn(), {

    select: (data) => data.advertisements,
    onSuccess: (data) => {
      console.log("hola")

      advertisementContext.dispatch({ type: 'SET_ADVERTISEMENT', payload: data });
    },
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

  const handleOnSearch = (string, results) => {
    string.length > 0 ? setQuery(results) : setQuery(null);
  };

  const handleOnClear = () => {
    setQuery(null);
  };

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
      <Box sx={{ py: 2 }}>
        <Search onSearch={handleOnSearch} onClear={handleOnClear} items={advertisements} />
      </Box>
      {advertisements?.length === 0 || query?.length === 0 ? (
        <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
          <Message type='info' title='Info'>
            No advertisements matching your search
          </Message>
        </Box>
      ) : (
        <Grid container>
          <Grid
            item
            md={2}
          />
          <Grid item container xs={12} spacing={2}>
            {!query ? advertisements?.map((advertisement) => (
              <CardAdvertisement key={advertisement.id} advertisement={advertisement} />
            ))
              : query?.map((advertisement) => (
                <CardAdvertisement key={advertisement.id} advertisement={advertisement} />
              ))}
          </Grid>

        </Grid>
      )}
    </Box>
  );
};

export default ProfilePage;
