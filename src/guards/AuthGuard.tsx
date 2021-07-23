import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
import useUser from '../../lib/useUser';

type AuthGuardProps = {
  children: ReactNode;
};

const useStyles = () =>
  makeStyles({
    centeredFlexBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      minWidth: 200
    }
  });

const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props;
  const classes = useStyles();
  const { user } = useUser({ redirectTo: '/login' });

  // Server-render loading state
  if (!user?.isLoggedIn) {
    return <>Loading...</>;
  }
  return <>{children}</>;
};

export default AuthGuard;
