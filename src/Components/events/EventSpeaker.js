/* eslint-disable react/prop-types */
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const EventSpeaker = React.forwardRef((props, ref) => {
  const { item, speakers, setSpeakers, id, index, handleSpeakerChange } = props;
  React.useImperativeHandle(ref, () => ({
    handleSubmit(setSpeakers) {
      // Handle submit logic here
      setSpeakers([
        ...speakers,
        {
          id: uuidv4(),
          speaker: {
            eventSpeakerName: '',
            eventSpeakerTitle: '',
            eventSpeakerBio: '',
            eventSpeakerImage: '',
          },
        },
      ]);
    },
  }));
  const handleDelete = () => {
    const updatedagendas = speakers.filter((item) => item.id !== id);
    setSpeakers(updatedagendas);
  };
  return (
    <Stack sx={{ backgroundColor: 'white', boxShadow: 4, padding: 4 }} spacing={1}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="semibold">Event Speaker</Typography>
        <Button sx={{ width: 'auto' }} variant="delete" onClick={handleDelete}>
          Remove Speaker
        </Button>
      </Box>
      <Stack spacing={1} mt={2}>
        <TextField
          sx={{ width: '100%' }}
          name="eventSpeakerName"
          type="text"
          value={item?.eventSpeakerName}
          label="Event Speaker Name"
          onChange={(e) => handleSpeakerChange(e, index)}
        />
        <TextField
          sx={{ width: '100%' }}
          name="eventSpeakerTitle"
          type="text"
          value={item?.eventSpeakerTitle}
          label="Event Speaker Title"
          onChange={(e) => handleSpeakerChange(e, index)}
        />
        <Typography variant="lightInfo">
          Enter the salutations/credentials/qualifications of the speaker. For Example LEED AP Professional, Doctor PhD.
          etc.
        </Typography>
        <TextField
          sx={{ width: '100%' }}
          name="eventSpeakerBio"
          type="text"
          multiline
          rows={4}
          value={item?.eventSpeakerBio}
          label="Event Speaker Bio"
          onChange={(e) => handleSpeakerChange(e, index)}
        />
        <Typography variant="lightInfo">
          Add speaker biography. If bio is missing the speaker will be listed below the main speakers in tiles on
          speakers tab.
        </Typography>
        <Stack spacing={1}>
          <Typography variant="semibold">Event Speaker Image</Typography>
          <input
            accept="image/png, image/gif, image/jpeg"
            type="file"
            onChange={(e) => handleSpeakerChange(e, index)}
          />
          <Typography variant="lightInfo">One file only. 100 MB limit. Allowed types: png gif jpg jpeg.</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
});

export default EventSpeaker;
