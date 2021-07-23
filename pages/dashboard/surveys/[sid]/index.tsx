import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getFetcher } from '../../../../util/swrFetchers';

import NewSurveyForm from '../../../../src/components/survey/NewSurveyForm';
import { useDispatch } from 'react-redux';
import { getSurvey, setEditMode } from '../../../../src/redux/slices/survey';
import DashboardLayout from '../../../../src/components/DashboardLayout';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AuthGuard from '../../../../src/guards/AuthGuard';
import { useEffect } from 'react';

const SurveyDetails = () => {
  const router = useRouter();
  const { sid } = router.query;
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetchSurvey() {
      await getSurvey(sid as string);
    }
    if (sid) {
      fetchSurvey();
      dispatch(setEditMode(true));
    }
  }, [sid]);

  return (
    <AuthGuard>
      <DashboardLayout>
        <Helmet>
          <title>Survey | Guardian Forms</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item sm={9} xs={12}>
                <NewSurveyForm />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </AuthGuard>
  );
};

export default SurveyDetails;
