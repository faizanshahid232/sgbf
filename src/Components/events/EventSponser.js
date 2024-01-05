/* eslint-disable react/prop-types */
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const EventSponser = React.forwardRef((props, ref) => {
  const { item, sponsers, setSponsers, id, index, handleSponserChange } = props;
  React.useImperativeHandle(ref, () => ({
    handleSubmit(setSponsers) {
      // Handle submit logic here
      setSponsers([
        ...sponsers,
        {
          id: uuidv4(),
          sponser: {
            eventSponserName: '',
            eventSponserBio: '',
            eventSponserLogo: '',
            eventSponserUrl: '',
            eventLinkTest: '',
          },
        },
      ]);
    },
  }));
  const handleDelete = () => {
    const updatedagendas = sponsers.filter((item) => item.id !== id);
    setSponsers(updatedagendas);
  };
  return (
    <Stack sx={{ backgroundColor: 'white', boxShadow: 4, padding: 4 }} spacing={1}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="semibold">Event Sponser</Typography>
        <Button sx={{ width: 'auto' }} variant="delete" onClick={handleDelete}>
          Remove Sponser
        </Button>
      </Box>
      <Stack spacing={1} mt={2}>
        <TextField
          sx={{ width: '100%' }}
          name="eventSponserName"
          type="text"
          value={item?.eventSponserName}
          label="Event Sponser Name"
          onChange={(e) => handleSponserChange(e, index)}
        />

        <TextField
          sx={{ width: '100%' }}
          name="eventSponserBio"
          type="text"
          multiline
          rows={4}
          value={item?.eventSponserBio}
          label="Event Sponser Bio"
          onChange={(e) => handleSponserChange(e, index)}
        />
        <Stack sx={{ backgroundColor: '#D3D3D3', padding: 4, borderRadius: 2 }} spacing={1}>
          <Typography variant="semibold">Event Sponser Logo</Typography>
          <input
            accept="image/png, image/gif, image/jpeg"
            type="file"
            onChange={(e) => handleSponserChange(e, index)}
          />
        </Stack>
        <Stack sx={{ backgroundColor: 'white', boxShadow: 2, padding: 2 }} spacing={2}>
          <Typography variant="semibold">Sponsor External URL</Typography>
          <Stack spacing={2}>
            <TextField
              sx={{ width: '100%' }}
              name="eventSponserUrl"
              type="text"
              value={item?.eventSponserUrl}
              label="URL"
              onChange={(e) => handleSponserChange(e, index)}
            />
            <Typography mb={'8px'} variant="lightInfo">
              Start typing the title of a piece of content to select it. You can also enter an internal path such as
              /node/add or an external URL such as http://example.com. Enter to link to the front page. Enter to display
              link text only. Enter to display keyboard-accessible link text only.
            </Typography>
            <TextField
              sx={{ width: '100%' }}
              name="eventLinkTest"
              type="text"
              value={item?.eventLinkTest}
              label="Link text"
              onChange={(e) => handleSponserChange(e, index)}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
});

export default EventSponser;
