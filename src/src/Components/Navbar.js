/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/sgbf-logo_0.png';
import './Navbar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Menu, MenuItem, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../Redux/Slice/user';
import FrontAccountPopover from '../../layouts/dashboard/header/FrontAccountPopover';
import TranslatorPage from './TranslatorPage';

export default function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('sgbf_token');
  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [dispatch, token]);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
      <AppBar sx={{ backgroundColor: 'white', padding: 4 }} position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
            <Box>
              <Link to="/">
                <img width={'20%'} src={Logo} alt="" />
              </Link>
            </Box>
            <Stack
              spacing={6}
              sx={{
                borderBottom: 2,
                borderColor: 'gray.300',
                py: 3,
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -10%)',
              }}
              // width={"100%"}
              direction={'row'}
            >
              <Link
                to="/about"
                style={{
                  color: '#626262',
                  fontWeight: 'bold',
                }}
              >
                About
              </Link>
              <Link
                to="/membership"
                style={{
                  color: '#626262',
                  fontWeight: 'bold',
                }}
              >
                Membership
              </Link>
              <Link
                to="/events"
                style={{
                  color: '#626262',
                  fontWeight: 'bold',
                }}
              >
                Events
              </Link>
              {/* <div
                onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                onMouseLeave={() => setAnchorEl(null)}
                style={{
                  color: '#626262',
                  fontWeight: 'bold',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                Directory
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  elevation={0}
                  sx={{
                    '& .MuiMenu-paper': {
                      marginTop: '2px',
                      backgroundColor: 'white',
                    },
                  }}
                >
                  <MenuItem onClick={() => { navigate('/articles'); setAnchorEl(null); }}>Articles</MenuItem>
                  <MenuItem onClick={() => { navigate('/directory/people'); setAnchorEl(null); }}>Peoples</MenuItem>
                  <MenuItem onClick={() => { navigate('/projects'); setAnchorEl(null); }}>Projects</MenuItem>
                  <MenuItem onClick={() => { navigate('/market-place'); setAnchorEl(null); }}>Marketplace</MenuItem>
                </Menu>
              </div> */}
            </Stack>
            <Box display={'flex'} alignItems={'center'}>
              <TranslatorPage />

              {!token ? (
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
                  onClick={() => navigate('/sign_in')}
                >
                  Login
                </Button>
              ) : (
                <> {userData && userData.userData ? <FrontAccountPopover /> : null} </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
