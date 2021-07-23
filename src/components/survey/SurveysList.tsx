import {
  Typography
} from '@material-ui/core';

import { ISurvey } from '../../../@types/survey';
import useSWR from 'swr';
import SurveyCard from "./SurveyCard";
import {getFetcher} from "../../../util/swrFetchers";

const SurveysList = () => {
  const surveys = useSWR('/api/surveys', getFetcher).data;

  return surveys ? (
    <ul>
      {surveys.map((survey: ISurvey) => (
        <SurveyCard key={survey._id} survey={survey} />
      ))}
    </ul>
  ) : (
    <Typography>Loading ... </Typography>
  );
};

export default SurveysList;
