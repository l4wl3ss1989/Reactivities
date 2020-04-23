import React, { useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityStore from './stores/activityStore';
import { observer } from 'mobx-react-lite';

import NavBar from './components/nav/navBar';
import ActivityDashboard from './components/activities/dashboard/ActivityDashboard';
import Loading from './components/UI/Loading';
import './styles.css';

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <Loading content="Loading activities..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
};

export default observer(App);
