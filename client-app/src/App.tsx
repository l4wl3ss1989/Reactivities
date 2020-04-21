import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';

import { IActivity } from './models/activity';
import NavBar from './components/nav/navBar';
import ActivityDashboard from './components/activities/dashboard/ActivityDashboard';
import './styles.css';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleSelectActivity = (activityId: string) => {
    const selectedActivity = activities.find(activity => activity.id === activityId);
    setSelectedActivity(selectedActivity);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(undefined);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities([...activities.filter(a => a.id !== activityId)]);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await axios.get<IActivity[]>('http://localhost:5000/api/activities');
        const activities: IActivity[] = data.map(activity => ({
          ...activity,
          date: activity.date.split('.')[0],
        }));
        setActivities(activities);
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchActivities();
  }, []);

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          selectActivity={handleSelectActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </Container>
    </>
  );
};

export default App;
