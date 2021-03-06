import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Book as BookIcon,
  Edit as PencilIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  User as UserIcon
} from 'react-feather';
import NavItem from './NavItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from '../theme/theme';

const user = {
  avatar: 'https://api.iconify.design/carbon:user-avatar-filled.svg',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/dashboard/surveys/new',
    icon: PencilIcon,
    title: 'New Survey'
  },
  {
    href: '/dashboard/surveys',
    icon: BookIcon,
    title: 'My Surveys'
  },
  {
    href: '/dashboard/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/dashboard/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/help',
    icon: AlertCircleIcon,
    title: 'Help'
  }
];

type DashboardSidebarProps = {
  onMobileClose: () => void;
  openMobile: boolean;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  onMobileClose,
  openMobile
}) => {
  const router = useRouter();
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            width: 64,
            height: 64
          }}
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      {hidden && (
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      )}

      {!hidden && (
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      )}
    </>
  );
};

export default DashboardSidebar;
