import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Copyright from '../src/components/Copyright';
import AppAppBar from '../src/components/AppAppBar';
import ProductHero from '../src/components/landing/ProductHero';
import connectToDatabase  from '../util/mongodb';
import { GetServerSidePropsContext } from 'next';

type HomeProps = {
  isConnected: boolean;
};

const Home: FC<HomeProps> = ({ isConnected }) => {
  return (
    <div>
      <Box>
        <AppAppBar />
        <ProductHero />
        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
        <Copyright />
      </Box>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = await connectToDatabase();
  const isConnected = client ? true : false;

  return {
    props: { isConnected }
  };
}

export default Home;
