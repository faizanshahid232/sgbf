/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';

// components
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const organization = useSelector((s) => s.organization?.data?.data);
  const events = useSelector((s) => s.events?.data?.data);
  const projects = useSelector((s) => s.projects?.data?.data);
  const articales = useSelector((s) => s.articales?.data?.data);

  return (
    <>
      <Helmet>
        <title> Dashboard | Saudi Green Building Forum</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="dashboard-container-box">
              <Typography variant="h6">Total Events</Typography>
              <Typography variant="h5" pt={1}>
                {!events || events.length === 0 ? '0' : events.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="dashboard-container-box">
              <Typography variant="h6">Total Organizations</Typography>
              <Typography variant="h5" pt={1}>
                {!organization || organization.length === 0 ? '0' : organization.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="dashboard-container-box">
              <Typography variant="h6">Total Articles</Typography>
              <Typography variant="h5" pt={1}>
                {!articales || articales.length === 0 ? '0' : articales.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="dashboard-container-box">
              <Typography variant="h6">Total Projects</Typography>
              <Typography variant="h5" pt={1}>
                {!projects || projects.length === 0 ? '0' : projects.length}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
