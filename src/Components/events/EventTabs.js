/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Stack, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import RichTextEditor from '../UI/TextField/RichTextEditor';
import EventAgenda from './EventAgenda';
import EventSpeaker from './EventSpeaker';
import EventSponser from './EventSponser';

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
        <Box sx={{ p: 3 }}>
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

export default function EventTabs({
  body,
  setBody,
  agendas,
  setAgendas,
  speakers,
  setSpeakers,
  sponsers,
  setSponsers,
  values,
  handleChange,
}) {
  const [value, setValue] = React.useState(0);
  const eventBoxRef = useRef();
  const eventSpeakerBoxRef = useRef();

  const handleSpeakerChange = (e, index) => {
    const values = [...speakers];
    values[index].speaker[e.target.name] = e.target.value;
    if (e.target.type === 'file') {
      const file = e.target.files[0];

      // Check if a file is selected

      // Check file type
      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'image/png' && fileType !== 'video/mp4') {
        toast.error('Please select a valid image (JPEG, PNG) or MP4 file.');
        // setSelectedFile(null);
        return;
      }

      // Check file size
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 3) {
        toast.error('File size exceeds the maximum limit of 3 MB.');
        // setSelectedFile(null);

        return;
      }
      values[index].speaker.eventSpeakerImage = file;
    }
    setSpeakers(values);
  };

  const handleSponserChange = (e, index) => {
    const values = [...sponsers];
    values[index].sponser[e.target.name] = e.target.value;
    if (e.target.type === 'file') {
      const file = e.target.files[0];

      // Check if a file is selected

      // Check file type
      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        toast.error('Please select a valid image (JPEG, PNG)');
        // setSelectedFile(null);
        return;
      }

      // Check file size
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 3) {
        toast.error('File size exceeds the maximum limit of 3 MB.');
        // setSelectedFile(null);

        return;
      }
      values[index].sponser.eventSponserLogo = file;
    }
    setSponsers(values);
  };

  console.log('sponsers===>', sponsers);

  const handleChangeTime = (e, index) => {
    const values = [...agendas];
    values[index].agenda.totaltime = e.target.value;
    setAgendas(values);
  };

  const handleChangeSummary = (e, index) => {
    const values = [...agendas];
    values[index].agenda.summary = e.target.value;
    setAgendas(values);
  };

  const handleChangeDetail = (content, index) => {
    const values = [...agendas];
    values[index].agenda.details = content;
    setAgendas(values);
  };
  const handleAddEventAgenda = React.useCallback((data) => {
    setAgendas([
      {
        id: uuidv4(),
        agenda: {},
      },
    ]);
    if (eventBoxRef.current) {
      eventBoxRef.current.handleSubmit(setAgendas);
    }
  }, []);

  const handleAddEventSpeaker = React.useCallback((data) => {
    setSpeakers([
      {
        id: uuidv4(),
        speaker: {},
      },
    ]);
    if (eventSpeakerBoxRef.current) {
      eventSpeakerBoxRef.current.handleSubmit(setSpeakers);
    }
  }, []);

  const handleAddEventSponser = React.useCallback((data) => {
    setSponsers([
      {
        id: uuidv4(),
        sponser: {},
      },
    ]);
    if (eventSpeakerBoxRef.current) {
      eventSpeakerBoxRef.current.handleSubmit(setSponsers);
    }
  }, []);

  console.log('agendas=====>', agendas);
  console.log('speakers=====>', speakers);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', border: '1px solid #D3D3D3' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChanges} aria-label="basic tabs example">
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Agenda" {...a11yProps(1)} />
          <Tab label="Speakers" {...a11yProps(2)} />
          <Tab label="Sponser" {...a11yProps(3)} />
          <Tab label="Register" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack sx={{ backgroundColor: 'white', boxShadow: 4, padding: 4 }} spacing={1}>
          <Typography variant="semibold">Event Summary</Typography>
          <RichTextEditor body={body} setBody={setBody} />
          <Typography variant="lightInfo">Add more detail about the event here. Highlights, location, etc.</Typography>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {agendas.map((item, index) => (
          <EventAgenda
            key={item.id}
            id={item.id}
            index={index}
            ref={eventBoxRef}
            agendas={agendas}
            setAgendas={setAgendas}
            item={item.agenda}
            handleChangeTime={handleChangeTime}
            handleChangeSummary={handleChangeSummary}
            handleChangeDetail={handleChangeDetail}
          />
        ))}
        <Button sx={{ mt: 2, width: 'auto' }} variant="registor" onClick={handleAddEventAgenda}>
          Add Event Agenda
        </Button>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {speakers.map((item, index) => (
          <EventSpeaker
            key={item.id}
            id={item.id}
            index={index}
            ref={eventSpeakerBoxRef}
            speakers={speakers}
            setSpeakers={setSpeakers}
            item={item.speaker}
            handleSpeakerChange={handleSpeakerChange}
            // handleChangeTime={handleChangeTime}
            // handleChangeSummary={handleChangeSummary}
            // handleChangeDetail={handleChangeDetail}
          />
        ))}
        <Button sx={{ mt: 2, width: 'auto' }} variant="registor" onClick={handleAddEventSpeaker}>
          Add Event Speaker
        </Button>
      </TabPanel>
      <TabPanel value={value} index={3}>
        {sponsers.map((item, index) => (
          <EventSponser
            key={item.id}
            id={item.id}
            index={index}
            ref={eventSpeakerBoxRef}
            sponsers={sponsers}
            setSponsers={setSponsers}
            item={item.sponser}
            handleSponserChange={handleSponserChange}
            // handleChangeTime={handleChangeTime}
            // handleChangeSummary={handleChangeSummary}
            // handleChangeDetail={handleChangeDetail}
          />
        ))}
        <Button sx={{ mt: 2, width: 'auto' }} variant="registor" onClick={handleAddEventSponser}>
          Add Event Sponser
        </Button>{' '}
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Stack sx={{ backgroundColor: 'white', boxShadow: 4, padding: 4 }} spacing={2}>
          <TextField
            sx={{ width: '100%' }}
            name="eventFee"
            type="number"
            value={values.eventFee}
            label="Event Fee"
            onChange={handleChange}
          />
          <Stack sx={{ backgroundColor: 'white', boxShadow: 2, padding: 2 }} spacing={3}>
            <Typography variant="semibold">Event Registration URL</Typography>
            <Stack spacing={3}>
              <TextField
                sx={{ width: '100%' }}
                name="eventUrl"
                type="text"
                value={values.eventUrl}
                label="URL"
                onChange={handleChange}
              />
              <Typography mb={2} variant="lightInfo">
                Start typing the title of a piece of content to select it. You can also enter an internal path such as
                /node/add or an external URL such as http://example.com. Enter to link to the front page. Enter to
                display link text only. Enter to display keyboard-accessible link text only.
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                name="eventLinkText"
                type="text"
                value={values.eventLinkText}
                label="Link Text"
                onChange={handleChange}
              />
              <Typography mb={2} variant="lightInfo">
                Add a link to your registration page (ie Eventbrite)
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </TabPanel>
    </Box>
  );
}
