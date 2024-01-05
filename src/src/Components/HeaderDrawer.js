/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import { Link } from "react-scroll";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Collapse from "@mui/material/Collapse";
import Logo from "../Assets/sgbf-logo_0.png";
import TranslatorPage from "./TranslatorPage";
import FrontAccountPopover from "../../layouts/dashboard/header/FrontAccountPopover";
import { getUserData } from "../../Redux/Slice/user";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const HeaderDrawerResponsive = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [openDirectory, setOpenDirectory] = React.useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem('sgbf_token');
  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [dispatch, token]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const handleDirectoryClick = () => {
  //   setOpenDirectory(!openDirectory);
  // };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          elevation={0}
          sx={{ color: "black", backgroundColor: "white" }}
          position="fixed"
          open={open}
        >
          <Toolbar className="space-btw">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 7, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              className="logo-link"
              to="/"

              offset={-50}
              duration={500}
              delay={500}
            >
              <div className="logo-img">
                <img width="200px" src={Logo} alt="logo" />
              </div>
            </Link>
            <Box display={'flex'} alignItems={'center'}>


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
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <TranslatorPage />
          </Box>
          <List>
            <ListItem>
              <ListItemIcon></ListItemIcon>
              <Link
                to="/"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                delay={500}
                onClick={handleDrawerClose}
              >
                <ListItemText>
                  {" "}
                  {
                    <Typography
                      variant="h5"
                      style={{
                        color: "#001322",
                        fontWeight: 500,
                        fontSize: "20px",
                      }}
                    >
                      Home
                    </Typography>
                  }
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon></ListItemIcon>
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                delay={500}
                onClick={handleDrawerClose}
              >
                <ListItemText>
                  {
                    <Typography
                      variant="h5"
                      style={{
                        color: "#001322",
                        fontWeight: 500,
                        fontSize: "20px",
                      }}
                    >
                      About
                    </Typography>
                  }
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon></ListItemIcon>
              <Link
                to="membership"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                delay={500}
                onClick={handleDrawerClose}
              >
                <ListItemText>
                  {
                    <Typography
                      variant="h5"
                      style={{
                        color: "#001322",
                        fontWeight: 500,
                        fontSize: "20px",
                      }}
                    >
                      Membership
                    </Typography>
                  }
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon></ListItemIcon>
              <Link
                to="events"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                delay={500}
                onClick={handleDrawerClose}
              >
                <ListItemText>
                  {
                    <Typography
                      variant="h5"
                      style={{
                        color: "#001322",
                        fontWeight: 500,
                        fontSize: "20px",
                      }}
                    >
                      Events
                    </Typography>
                  }
                </ListItemText>
              </Link>
            </ListItem>
            {/* <ListItem button onClick={handleDirectoryClick}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h5">Directory</Typography>
              </ListItemText>
              {openDirectory ? <ExpandLess /> : <ExpandMore />}
            </ListItem> */}
            {/* <Collapse in={openDirectory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <Link
                    to="/articles"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    delay={500}
                    onClick={handleDrawerClose}
                  >
                    <ListItemText>
                      {
                        <Typography
                          variant="h5"
                          style={{
                            color: "#001322",
                            fontWeight: 500,
                            fontSize: "20px",
                          }}
                        >
                          Articles
                        </Typography>
                      }
                    </ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <Link
                    to="/directory/people"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    delay={500}
                    onClick={handleDrawerClose}
                  >
                    <ListItemText>
                      {
                        <Typography
                          variant="h5"
                          style={{
                            color: "#001322",
                            fontWeight: 500,
                            fontSize: "20px",
                          }}
                        >
                          Peoples
                        </Typography>
                      }
                    </ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <Link
                    to="/projects"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    delay={500}
                    onClick={handleDrawerClose}
                  >
                    <ListItemText>
                      {
                        <Typography
                          variant="h5"
                          style={{
                            color: "#001322",
                            fontWeight: 500,
                            fontSize: "20px",
                          }}
                        >
                          Projects
                        </Typography>
                      }
                    </ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon></ListItemIcon>
                  <Link
                    to="/market-place"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    delay={500}
                    onClick={handleDrawerClose}
                  >
                    <ListItemText>
                      {
                        <Typography
                          variant="h5"
                          style={{
                            color: "#001322",
                            fontWeight: 500,
                            fontSize: "20px",
                          }}
                        >
                          Marketplace
                        </Typography>
                      }
                    </ListItemText>
                  </Link>
                </ListItem>
              </List>
            </Collapse> */}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </>
  );
};

export default HeaderDrawerResponsive;
