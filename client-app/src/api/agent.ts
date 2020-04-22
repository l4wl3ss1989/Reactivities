import axios from 'axios';
import { IActivity } from '../models/activity';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

// const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const requests = {
  get: async (url: string) => {
    const { data } = await axios.get(url);
    await sleep(1000);
    return data;
  },
  post: async (url: string, body: {}) => {
    const { data } = await axios.post(url, body);
    await sleep(1000);
    return data;
  },
  put: async (url: string, body: {}) => {
    const { data } = await axios.put(url, body);
    await sleep(1000);
    return data;
  },
  del: async (url: string) => {
    const { data } = await axios.delete(url);
    await sleep(1000);
    return data;
  },
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
};

export default {
  Activities,
};
