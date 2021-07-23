import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import DashboardLayout from '../../../src/components/DashboardLayout';
import AuthGuard from '../../../src/guards/AuthGuard';
import NewSurveyForm from '../../../src/components/survey/NewSurveyForm';

const NewSurvey = () => (
  <AuthGuard>
    <DashboardLayout>
      <Helmet>
        <title>New Survey | Guardian Forms</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <NewSurveyForm isEdit={true}/>
        </Container>
      </Box>
    </DashboardLayout>
  </AuthGuard>
);

export default NewSurvey;
