import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { getUserData } from '../../Redux/Slice/user';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

const NavItemRoot = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  height: 44,
  position: 'relative',
  textTransform: 'capitalize',
  paddingRight: theme.spacing(2.5),
  // '&.isNested': {
  //   paddingLeft: theme.spacing(8),
  // },
}));

const NavItemIcon = styled(ListItemIcon)(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const NavItemInfo = styled(Box)(({ theme }) => ({
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  borderRadius: '50%',
  fontSize: 10,
  color: 'common.white',
  backgroundColor: theme.palette.error.main,
}));

function NavItem({ item, isNested }) {
  const { title, path, icon, info, children } = item;
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = Array.isArray(children);
  // User Data
  const dispatch = useDispatch();
  const userData = useSelector((s) => s?.user?.userData);
  const getUserDatas = async () => {
    try {
      await dispatch(getUserData());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDatas();
  }, [dispatch]);
  // User Data
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const NavItemContent = (
    <>
      <NavItemIcon>{icon && icon}</NavItemIcon>
      <ListItemText disableTypography primary={title} />
      {info && <NavItemInfo>{info}</NavItemInfo>}
      {hasChildren &&
        (isOpen ? (
          <ExpandLess
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          />
        ) : (
          <ExpandMore
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          />
        ))}
    </>
  );

  if (hasChildren) {
    return (
      <>
        <NavItemRoot button onClick={handleToggle} className="isNested">
          {NavItemContent}
        </NavItemRoot>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 2 }} component="div" disablePadding>
            {children?.map((item) => (
              <NavItem key={item.title} item={item} isNested />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <NavItemRoot
      button
      disabled={userData && userData?.pay_status !== "paid"}
      component={RouterLink}
      to={path}
      className={isNested ? 'isNested' : ''}
    >
      {NavItemContent}
    </NavItemRoot>
  );
}

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data?.map((item) => (
          <Box>
            <NavItem key={item.title} item={item} />
          </Box>
        ))}
      </List>
    </Box>
  );
}
