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
  order?: number;
  genres?: string[];
  popularity?: number;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  overview?: string;
  origin_country?: string[];
  status?: string;
  revenue?: number;
}

export enum MediaType {
  "tv",
  "movie",
  "person",
}

export enum Direction {
  "left",
  "right",
}
