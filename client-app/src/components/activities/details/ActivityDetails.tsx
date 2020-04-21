import React from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import { IActivity } from '../../../models/activity';

interface IProps {
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | undefined) => void;
}

const ActivityDetails: React.FC<IProps> = ({ activity, setEditMode, setSelectedActivity }) => (
  <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span>{activity.date}</span>
      </Card.Meta>
      <Card.Description>{activity.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
        <Button onClick={() => setEditMode(true)} basic color="blue" content="Edit" />
        <Button onClick={() => setSelectedActivity(undefined)} basic color="grey" content="Cancel" />
      </Button.Group>
    </Card.Content>
  </Card>
);

export default ActivityDetails;
