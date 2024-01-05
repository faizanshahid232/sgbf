import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents, getAllEventsPublic, getEventByTerm } from '../../Redux/Slice/events';
import BasicTabs from '../Components/MyTabs';
import Conference from '../Assets/frontend/assets/img/conferences.png';

const MyTabs = ['Every Thing', 'Conference', 'Training', 'Workshop', 'Upcoming'];

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Events = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState('');
  const [value, setValue] = React.useState(0);
  const lgCard = useMediaQuery('(max-width:800px)');
  useEffect(() => {
    if (params) {
      const res = dispatch(getEventByTerm(params.toLowerCase()));
    } else {
      const res = dispatch(getAllEventsPublic());
    }
  }, [dispatch, params]);
  const events = useSelector((s) => s?.events?.publicData?.data);
  const handleChange = (event, newValue) => {
    if (newValue !== 0) {
      setParams(MyTabs[newValue]);
    } else {
      setParams(null);
    }
    setValue(newValue);
  };
  return (
    <Stack spacing={2} sx={{ backgroundColor: '#EFEFEF' }}>
      <Box
        sx={{
          backgroundImage: `radial-gradient(rgba(245,211,40,0.2), rgba(245,211,40,0.4), rgba(245,211,40,0.5), rgba(2245,211,40,0.1)), url(${Conference}) `,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom right',

          width: '100%',
          height: 'calc(70vh - 40px)',
        }}
      >
        <Typography
          sx={{
            marginTop: '200px',
            marginLeft: '160px',
            fontSize: '3em',
            lineHeight: 1.25,
            color: 'black',
            fontFamily: 'jaf-bernina-sans',
          }}
        >
          Events!
        </Typography>
      </Box>
      <Box sx={{ marginLeft: lgCard ? '0px' : '250px', paddingLeft: 8 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={MyTabs[0]} {...a11yProps(0)} />
          <Tab label={MyTabs[1]} {...a11yProps(1)} />
          <Tab label={MyTabs[2]} {...a11yProps(2)} />
          <Tab label={MyTabs[3]} {...a11yProps(3)} />
          <Tab label={MyTabs[4]} {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={value} sx={{ backgroundColor: '#EFEFEF', width: '100%' }}>
        <BasicTabs events={events} />
      </TabPanel>
    </Stack>
  );
};

export default Events;
