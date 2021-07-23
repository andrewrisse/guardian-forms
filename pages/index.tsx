import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Copyright from '../src/components/Copyright';
import AppAppBar from '../src/components/AppAppBar';
import ProductHero from '../src/components/landing/ProductHero';

const Home = () => {
  return (
    <div>
      <Box>
        <AppAppBar />
        <ProductHero />

        <Copyright />
      </Box>
    </div>
  );
};

export default Home;
