import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
// import axios from 'axios';

import { IActivity } from './models/activity';
import NavBar from './components/nav/navBar';
import ActivityDashboard from './components/activities/dashboard/ActivityDashboard';
import './styles.css';
import agent from './api/agent';
import Loading from './components/UI/Loading';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (activityId: string) => {
    const selectedActivity = activities.find(activity => activity.id === activityId);
    setSelectedActivity(selectedActivity);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(undefined);
    setEditMode(true);
  };

  const handleCreateActivity = async (activity: IActivity) => {
    setSubmiting(true);
    await agent.Activities.create(activity);
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmiting(false);
  };

  const handleEditActivity = async (activity: IActivity) => {
    setSubmiting(true);
    await agent.Activities.update(activity);
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmiting(false);
  };

  const handleDeleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => {
    setSubmiting(true);
    setTarget(event.currentTarget.name);
    await agent.Activities.delete(activityId);
    setActivities([...activities.filter(a => a.id !== activityId)]);
    setSubmiting(false);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await agent.Activities.list();
      const activities: IActivity[] = data.map(activity => ({
        ...activity,
        date: activity.date.split('.')[0],
      }));
      setActivities(activities);
      setLoading(false);
      // try {
      //   const { data } = await axios.get<IActivity[]>('http://localhost:5000/api/activities');
      //   const activities: IActivity[] = data.map(activity => ({
      //     ...activity,
      //     date: activity.date.split('.')[0],
      //   }));
      //   setActivities(activities);
      // } catch (ex) {
      //   console.log(ex);
      // }
    };
    fetchActivities();
  }, []);

  if (loading) return <Loading content="Loading activities..." />;

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
          submiting={submiting}
          target={target}
        />
      </Container>
    </>
  );
};

export default App;
