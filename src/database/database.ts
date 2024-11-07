import { UserInterface } from '../user/user.model';
import { TrackInterface } from '../track/track.model';

const usersData: UserInterface[] = [
  {
    id: '70d6460f-e3fc-4718-8304-6e9b383d3ef2',
    login: 'ded-valera',
    password: 'password',
    version: 1,
    createdAt: 1731005623283,
    updatedAt: 1731005623283,
  },
];

const tracksData: TrackInterface[] = [
  {
    id: '70d6460f-e3fc-4718-8304-6e9b383d3ef2',
    name: 'Siniy Tracktor.mp3',
    artistId: '70d6460f-e3fc-4718-8304-6e9b383d3ef1',
    albumId: '70d6460f-e3fc-4718-8304-6e9b383d3ef5',
    duration: 128,
  },
];

export default { tracksData, usersData };
