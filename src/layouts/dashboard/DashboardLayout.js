/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import { useDispatch } from 'react-redux';
import Header from './header';
import Nav from './nav';
import { getUserData } from '../../Redux/Slice/user';
import { getAllOrganization } from '../../Redux/Slice/organization';
import { getAllEvents } from '../../Redux/Slice/events';
import { getAllProjects } from '../../Redux/Slice/projects';
import { getAllArticles } from '../../Redux/Slice/articales';
import ChatButton from '../../Components/Chat/ChatButton';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('sgbf_token')) {
      navigate('/sign_in');
    } else {
      dispatch(getUserData());
      dispatch(getAllOrganization());
      dispatch(getAllEvents());
      dispatch(getAllProjects());
      dispatch(getAllArticles());
    }
  }, [window.location.href]);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
        <ChatButton />
      </Main>
    </StyledRoot>
  );
}
