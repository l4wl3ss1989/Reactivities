import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const data = await agent.Activities.list();
      runInAction('loading activities', () => {
        data.forEach(activity => {
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (err) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
        console.log(err);
      });
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('creating activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (err) {
      runInAction('create activity error', () => {
        console.log(err);
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('editing activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (err) {
      runInAction('edit activity error', () => {
        console.log(err);
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (activityId: string, event: SyntheticEvent<HTMLButtonElement>) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(activityId);
      runInAction('deleting activity', () => {
        this.activityRegistry.delete(activityId);
        this.submitting = false;
        this.target = '';
      });
    } catch (err) {
      runInAction('delete activity error', () => {
        console.log(err);
        this.submitting = false;
        this.target = '';
      });
    }
  };

  @action openCreateForm = () => {
    this.selectedActivity = undefined;
    this.editMode = true;
  };

  @action openEditForm = (activityId: string) => {
    this.selectedActivity = this.activityRegistry.get(activityId);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectActivity = (activityId: string) => {
    this.selectedActivity = this.activityRegistry.get(activityId);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
