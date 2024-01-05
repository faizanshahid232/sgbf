import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery, Grid, Stack, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import Default from '../Assets/No-Image.png';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs(props) {
  const smCard = useMediaQuery('(max-width:600px)');
  const lgCard = useMediaQuery('(max-width:800px)');

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {props?.events?.length ? (
        <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} padding={4}>
          {props?.events?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item, index) => {
            return (
              <Grid
                item
                key={index}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={smCard ? 'column' : 'row'}
                width={lgCard ? '90%' : '70%'}
                lg={8}
                sm={12}
                gap={6}
                padding={4}
                sx={{ marginTop: 5, backgroundColor: '#fff', justifyContent: 'center' }}
              >
                <Box width={smCard ? '70%' : '35%'} height={'auto'}>
                  <img
                    src={item.eventFeatureImage ? IMAGE_BASEURL + item.eventFeatureImage : Default}
                    alt="img"
                    width={'200px'}
                    style={{ objectFit: 'fill' }}
                  />
                </Box>
                <Stack
                  width={smCard ? '100%' : '60%'}
                  spacing={3}
                  textAlign={'justify'}
                  component={'div'}
                  onClick={() => navigate(`/event-agenda/${item._id}`)}
                  sx={{ cursor: 'pointer', marginY: '5' }}
                >
                  <Typography color={'black'} fontSize={30} fontWeight={700}>
                    {item?.title}
                  </Typography>
                  <Typography color={'black'}> {item?.eventHeadline}</Typography>
                  <Box display={'flex'} flexDirection={smCard ? 'column' : 'row'} gap={2}>
                    <Typography color={'black'}>{item?.eventTerms}</Typography>
                    <Typography color={'black'} hidden={smCard}>
                      .
                    </Typography>
                    <Typography>{item?.eventDate}</Typography>
                  </Box>
                </Stack>
              </Grid>
            );
          })}
        </Stack>
      ) : (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Typography>No Data Found</Typography>
        </Box>
      )}

      <Grid item display={'flex'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props?.events !== undefined ? props?.events?.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />{' '}
      </Grid>
    </Box>
  );
}
