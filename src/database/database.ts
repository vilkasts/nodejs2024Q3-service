import type {
  AlbumInterface,
  ArtistInterface,
  FavoritesInterface,
  TrackInterface,
  UserInterface,
} from '../helpers/models';

const albumsData: AlbumInterface[] = [
  {
    id: '70d6460f-e3fc-4718-8304-6e9b383d3ef1',
    name: 'Meteora',
    artistId: '70d6460f-e3fc-4718-8304-6e9b383d3ef1',
    year: 2002,
  },
];

const artistsData: ArtistInterface[] = [
  {
    id: '70d6460f-e3fc-4718-8304-6e9b383d3ef2',
    name: 'Linkin Park',
    grammy: true,
  },
];

const tracksData: TrackInterface[] = [
  {
    id: '70d6460f-e3fc-4718-8304-6e9b383d3ef3',
    name: 'Siniy Tracktor.mp3',
    artistId: '70d6460f-e3fc-4718-8304-6e9b383d3ef2',
    albumId: '70d6460f-e3fc-4718-8304-6e9b383d3ef1',
    duration: 128,
  },
];

const usersData: UserInterface[] = [
  {
    id: '70d6460f-e3fc-4718-8304-6e9b383d3ef4',
    login: 'ded-valera',
    password: 'password',
    version: 1,
    createdAt: 1731337543645,
    updatedAt: 1731337566341,
  },
];

const favoritesData: FavoritesInterface = {
  albums: ['70d6460f-e3fc-4718-8304-6e9b383d3ef1'],
  artists: ['70d6460f-e3fc-4718-8304-6e9b383d3ef2'],
  tracks: ['70d6460f-e3fc-4718-8304-6e9b383d3ef3'],
};

export default {
  albumsData,
  artistsData,
  favoritesData,
  tracksData,
  usersData,
};
