import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import uuid from 'uuid/v4';

import ActivityStore from '../../../stores/activityStore';
import { IActivity } from '../../../models/activity';
import { observer } from 'mobx-react-lite';

interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
  const { submitting, createActivity, editActivity, cancelFormOpen } = useContext(ActivityStore);
  const initializeForm = () => {
    if (initialFormState) return initialFormState;
    return {
      id: '',
      title: '',
      category: '',
      description: '',
      date: '',
      city: '',
      venue: '',
    };
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input name="title" onChange={handleInputChange} placeholder="Title" value={activity.title} />
        <Form.TextArea
          name="description"
          onChange={handleInputChange}
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          name="category"
          onChange={handleInputChange}
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          name="date"
          onChange={handleInputChange}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input name="city" onChange={handleInputChange} placeholder="City" value={activity.city} />
        <Form.Input name="venue" onChange={handleInputChange} placeholder="Venue" value={activity.venue} />
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button onClick={cancelFormOpen} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
