import React, { useContext } from 'react';
import { Image, Card, Button } from 'semantic-ui-react';

import ActivityStore from '../../../stores/activityStore';

const ActivityDetails: React.FC = () => {
  const { selectedActivity: activity, openEditForm, cancelSelectedActivity } = useContext(ActivityStore);
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button onClick={() => openEditForm(activity!.id)} basic color="blue" content="Edit" />
          <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
