interface TrackInterface {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export type { TrackInterface };
