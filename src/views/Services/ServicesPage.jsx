import  Message  from '@/components/layout/messages/Message';
import { Box, Grid } from '@mui/material';
import React, {useState} from 'react'
import CardPublic from '@/components/layout/cards/CardPublic';
import Search from '../../components/navigation/search/Search';
import FullScreenLoader from '@/components/loaders/FullScreenLoader';
import { useAdvertisementContext } from '@/services/providers/AdvertisementContextProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllAdvertisementsFn } from '@/api/advertisementsApi';

const ServicesPage = () => {
  const advertisementContext = useAdvertisementContext();
  const [query, setQuery] = useState(null);
  const { isLoading, data: advertisements } = useQuery(['advertisements'], () => getAllAdvertisementsFn(), {

    select: (data) => data.advertisements,
    onSuccess: (data) => {

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
  const handleOnSearch = (string, results) => {
    string.length > 0 ? setQuery(results) : setQuery(null);
  };

  const handleOnClear = () => {
    setQuery(null);
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
   <>
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
          <Grid item container xs={12} spacing={2}>
            {!query ? advertisements.map((advertisement) => (
              <CardPublic key={advertisement.id} advertisement={advertisement} />
            ))
              : query?.map((advertisement) => (
                <CardPublic key={advertisement.id} advertisement={advertisement} />
              ))}
          </Grid>

        </Grid>
      )}
    </Box>   

   </>
  )
}

export default ServicesPage