import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// utils
import { bgBlur } from '../../../Utils/cssStyles';
// components
import Iconify from '../../../Components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import { getUserData } from '../../../Redux/Slice/user';
import Goback from '../../../Components/UI/Goback';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 70;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((s) => s?.user?.userData);
  const getUserDatas = async () => {
    try {
      const res = await dispatch(getUserData());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDatas();
  }, [dispatch]);
  
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {/* <Box sx={{ flexGrow: 1 }} /> */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent={window.location.hash === "#/dashboard/app" ? 'flex-end' : 'space-between'}
          width={'100%'}
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {window.location.hash === "#/dashboard/app" ? null :
            <Goback goBack={() => navigate(-1)} />}
          {user?.pay_status === 'paid' ? null : (
            <Button
              sx={{
                width: '150px',
                backgroundColor: '#DC5949',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#DC5949',
                },
              }}
              onClick={() => navigate('/payment/user')}
            >
              Upgrade Account
            </Button>
          )}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
