import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import DashboardLayout from '../../../src/components/DashboardLayout';
import AuthGuard from '../../../src/guards/AuthGuard';
import SurveysList from "../../../src/components/survey/SurveysList";

const Surveys = () => (
  <AuthGuard>
    <DashboardLayout>
      <Helmet>
        <title>My Surveys | Guardian Forms</title>
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
              <SurveysList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  </AuthGuard>
);

export default Surveys;
