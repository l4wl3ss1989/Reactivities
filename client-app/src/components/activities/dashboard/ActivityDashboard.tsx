import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
  activities: IActivity[];
  selectedActivity: IActivity | undefined;
  editMode: boolean;
  setSelectedActivity: (activity: IActivity | undefined) => void;
  selectActivity: (activityId: string) => void;
  deleteActivity: (activityId: string) => void;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectedActivity,
  selectActivity,
  setSelectedActivity,
  editMode,
  setEditMode,
  createActivity,
  editActivity,
  deleteActivity,
}) => (
  <Grid>
    <Grid.Column width={10}>
      <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
    </Grid.Column>
    <Grid.Column width={6}>
      {selectedActivity && !editMode && (
        <ActivityDetails
          activity={selectedActivity}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
        />
      )}
      {editMode && (
        <ActivityForm
          key={(selectedActivity && selectedActivity.id) || 0}
          setEditMode={setEditMode}
          activity={selectedActivity!}
          createActivity={createActivity}
          editActivity={editActivity}
        />
      )}
    </Grid.Column>
  </Grid>
);

export default ActivityDashboard;
