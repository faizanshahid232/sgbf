import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, TablePagination, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
// eslint-disable-next-line import/no-unresolved
import ProjectCard from 'src/Components/UI/Card/ProjectCard';
import { getAllProjects, getAllProjectsPublic } from '../../Redux/Slice/projects';
import CustomButton from '../Components/UI/CustomButton';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import CustomInputs from '../Components/UI/CustomInputs';
import projectsImg from '../Assets/img/projects.png';
import Default from '../Assets/frontend/assets/img/default.jpg';

function Projects() {
  const smCard = useMediaQuery('(max-width:600px)');
  const lgCard = useMediaQuery('(max-width:800px)');
  const dispatch = useDispatch();

  const projects = useSelector((s) => s?.projects?.data?.data);
  const [projectData, setProjectData] = useState(projects);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const res = dispatch(getAllProjectsPublic());
  }, [dispatch]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setProjectData(projects);
  }, [projects]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const findSearch = () => {
    const data = projectData?.filter((item) => item?.title.toLowerCase().includes(searchKey.toLowerCase()));
    setProjectData(data);
  };
  const resetSearch = () => {
    setSearchKey('');
    dispatch(getAllProjectsPublic());
  };
  useEffect(() => {
    if (searchKey === '') {
      setProjectData(projects);
    }
  }, [searchKey]);
  return (
    <Grid container justifyContent={"center"} sx={{ backgroundColor: '#EFEFEF' }}>
      <Box
        display={'flex'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        padding={12}
        sx={{
          background: `radial-gradient(rgba(243,142,27,0.7),rgba(243,142,27,0.7),rgba(243,142,27,0.7),rgba(243,142,27,0.7)), url(${projectsImg}) center bottom no-repeat`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
          backgroundSize: 'contain',
          backgroundColor: '#626262',
          marginBottom: '40px',
        }}
      >
        <Typography sx={{ fontSize: 50, fontWeight: 500, color: '#000' }}>Projects</Typography>
      </Box>
      <Grid item xs={12} p={2}>
        <Grid container spacing={2} justifyContent={'center'} alignItems={"center"}>
          <Grid item xs={11} sm={8} md={6} lg={4}>
            <CustomInputs
              placeholder="search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={5} md={3} lg={2} className='space-container'>
            <CustomButton variant="primaryOutlined" width={'auto'} onClick={findSearch}>
              SEARCH
            </CustomButton>
            <CustomButton variant="primaryOutlined" width={'auto'} onClick={resetSearch}>
              RESET
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} p={2}>
        <Grid container>
          {projectData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item, index) => {
            return (
              <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                <ProjectCard item={item} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item display={'flex'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
        <TablePagination
          rowsPerPageOptions={[12, 24, 36]}
          component="div"
          count={projects !== undefined ? projectData?.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />{' '}
      </Grid>
    </Grid>
  );
}

export default Projects;
