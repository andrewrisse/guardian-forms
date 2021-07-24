import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Copyright from '../src/components/Copyright';
import AppAppBar from '../src/components/AppAppBar';
import ProductHero from '../src/components/landing/ProductHero';
import {GetServerSidePropsContext} from "next";
import connectToDatabase from "../util/mongodb";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const client = await connectToDatabase();
    const isConnected = client ? true : false;

    return {
        props: { isConnected }
    };
}


export default Home;
