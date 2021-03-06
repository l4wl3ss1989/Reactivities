import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import ActivityStore from '../../../stores/activityStore';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

const ActivityDashboard: React.FC = () => {
  const { editMode, selectedActivity } = useContext(ActivityStore);
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm key={(selectedActivity && selectedActivity.id) || 0} activity={selectedActivity!} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
