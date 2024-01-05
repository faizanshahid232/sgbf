/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { Box, Stack, Typography, Grid } from '@mui/material';
import Default from '../Assets/No-Image.png';
import { getArticalbyId } from '../../Redux/Slice/articales';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';

function ArticleDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const [articleData, setArticleData] = useState();

  const fetchDescription = async () => {
    try {
      const res = await dispatch(getArticalbyId(params.id));
      // console.log('articalData: ', res);
      if (res.payload.data) {
        setArticleData(res.payload.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDescription();
  }, [dispatch]);

  return (
    <Grid container>
      <Stack item width={'100%'} display={'flex'} flexDirection={'column'} padding={6} gap={6}>
        <Box width={'30%'} height={'auto'} marginX={'auto'}>
          <img
            width={'100%'}
            height={'200px'}
            src={articleData?.image ? IMAGE_BASEURL + articleData?.image : Default}
            alt="img"
          />
        </Box>
        <Box>
          <div dangerouslySetInnerHTML={{ __html: articleData?.body }}></div>
          <Typography>
            <b>Author:</b>
            {articleData?.author ? articleData?.author : 'N/A'}
          </Typography>
          <Typography>
            <b>Title: </b>
            {articleData?.title ? articleData?.title : 'N/A'}
          </Typography>
          <Typography>
            <b>Tags: </b>
            {articleData?.tags ? articleData?.tags : 'N/A'}
          </Typography>
          <Typography>
            <b>Published Data: </b>
            {articleData?.publishedOn ? articleData?.publishedOn : 'N/A'}
          </Typography>
        </Box>
        <Box>{/* <CustomButton>Print</CustomButton> */}</Box>
      </Stack>
    </Grid>
  );
}

export default ArticleDetails;
