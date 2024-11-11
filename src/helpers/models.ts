interface AlbumInterface {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

interface ArtistInterface {
  id: string;
  name: string;
  grammy: boolean;
}

interface TrackInterface {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface UserInterface {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface FavoritesInterface {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export type {
  AlbumInterface,
  ArtistInterface,
  FavoritesInterface,
  TrackInterface,
  UserInterface,
};
