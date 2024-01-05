import { Grid, Button, Typography } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../Redux/Slice/user';
import ProfileCard from '../Components/UI/Card/ProfileCard';

const CardPage = () => {
  const user = useSelector((s) => s?.user?.userData);
  const dispatch = useDispatch();

  const getUserDatas = async () => {
    try {
      const res = await dispatch(getUserData());
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(user);
  useEffect(() => {
    getUserDatas();
  }, [dispatch]);

  const downloadPdf = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('generated.pdf');
    });
  };

  return (
    <Grid display="flex" alignItems="center" container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Card
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} id="pdf-content">
        <ProfileCard item={user} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Button onClick={downloadPdf}>Download</Button>
      </Grid>
    </Grid>
  );
};

export default CardPage;
