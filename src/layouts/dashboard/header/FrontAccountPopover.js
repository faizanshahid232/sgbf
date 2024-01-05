/* eslint-disable import/order */
import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// mocks_
import account from '../../../_mock/account';
import { getUserData } from '../../../Redux/Slice/user';
import { IMAGE_BASEURL } from '../../../Redux/API/http-common';

// ----------------------------------------------------------------------

export default function FrontAccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const user = useSelector((s) => s?.user?.userData);
  const dispatch = useDispatch();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem('sgbf_token');
    navigate('/sign_in');
  };
  const handleClose = () => {
    setOpen(null);
  };

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
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          src={
            (!user && user.profilePic === null) || user.profilePic === undefined
              ? `https://avatars.dicebear.com/api/initials/${user?.firstName} ${user?.lastName}.svg`
              : user.profilePic.indexOf('http') !== -1
              ? user.profilePic
              : IMAGE_BASEURL + user.profilePic
          }
          alt="photoURL"
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography component={Link} to="/dashboard" variant="subtitle2" noWrap>
            Dashboard
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
