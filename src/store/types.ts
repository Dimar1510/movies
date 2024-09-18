export interface ICardItem {
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  profile_path?: string;
  title?: string;
  name?: string;
  tagline?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  known_for_department?: string;
  job?: string;
  character?: string;
  genres?: { id: number; name: string }[];
  popularity?: number;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  overview?: string;
  origin_country?: string[];
  status?: string;
  revenue?: number;
  profiles?: Image[];
  logos?: Image[];
  backdrops?: Image[];
  media_type?: MediaType;
  key?: string;
  type?: string;
  published_at?: string;
  created_by: Person[];
  crew: Person[];
  cast: Person[];
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
  biography?: string;
  budget?: number;
}

export interface Person {
  adult?: boolean;
  gender?: number;
  id: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  character?: string;
  credit_id?: string;
  order?: number;
  job?: string;

  release_date?: string;
  first_air_date?: string;
}

export type MediaType = "tv" | "movie" | "person";

export enum Direction {
  "left",
  "right",
}

interface Image {
  file_path: string;
}
