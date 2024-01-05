/* eslint-disable react/prop-types */
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import RichTextEditor from '../UI/TextField/RichTextEditor';
import RichTextEvents from './RichTextEvents';

const EventAgenda = React.forwardRef((props, ref) => {
  const { item, agendas, setAgendas, id, handleChangeTime, index, handleChangeSummary, handleChangeDetail } = props;
  React.useImperativeHandle(ref, () => ({
    handleSubmit(setAgendas) {
      // Handle submit logic here
      setAgendas([
        ...agendas,
        {
          id: uuidv4(),
          agenda: {
            totaltime: '',
            summary: '',
            details: '',
          },
        },
      ]);
    },
  }));
  const handleDelete = () => {
    const updatedagendas = agendas.filter((item) => item.id !== id);
    setAgendas(updatedagendas);
  };
  return (
    <Stack sx={{ backgroundColor: 'white', boxShadow: 4, padding: 4 }} spacing={1}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="semibold">Event Agenda</Typography>
        <Button sx={{ width: 'auto' }} variant="delete" onClick={handleDelete}>
          Remove Agenda
        </Button>
      </Box>
      <Stack spacing={1} mt={2}>
        <TextField
          sx={{ width: '100%' }}
          name="totaltime"
          type="text"
          value={item.totaltime}
          label="Total time duration"
          onChange={(e) => handleChangeTime(e, index)}
        />
        <Typography variant="lightInfo" style={{ marginBottom: '8px' }}>
          For example: "9:00 AM - 9:00 PM"
        </Typography>
        <TextField
          sx={{ width: '100%' }}
          name="eventSummary"
          type="text"
          multiline
          rows={4}
          value={item.summary}
          label="Agenda Summary"
          onChange={(e) => handleChangeSummary(e, index)}
        />
        <Typography variant="lightInfo" style={{ marginBottom: '8px' }}>
          Add agenda summary or title. Giving short info of the agenda topics.
        </Typography>
        <Typography variant="semibold">Agenda details</Typography>
        <RichTextEvents body={item.details} handleChangeDetail={handleChangeDetail} index={index} />
        <Typography variant="lightInfo" style={{ marginBottom: '8px' }}>
          Enter agenda breakdown as per timings.
        </Typography>
        <Divider sx={{ backgroundColor: 'black' }} />
        <Typography variant="lightInfo">
          Add the event agenda time duration of that day, summary and a brief description of this day's agenda.
        </Typography>
      </Stack>
    </Stack>
  );
});

export default EventAgenda;
