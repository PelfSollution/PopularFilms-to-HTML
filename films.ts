import { apiKey } from "./config.ts";
import { writeFile } from "fs/promises";
export class Film {
  constructor(
    public id: number,
    public title: string,
    public release_date: string,
    public director: string,
    public poster_path: string,
    public overview: string,
    public watchProvidersES: WatchProvider[]
  ) {}

  getImageUrl(): string {
    return `https://image.tmdb.org/t/p/w500${this.poster_path}`;
  }
}

export class WatchProvider {
  constructor(
    public logo_path: string,
    public provider_id: number,
    public provider_name: string,
    public display_priority: number
  ) {}

  getImageLogo(): string {
    return `https://image.tmdb.org/t/p/w200${this.logo_path}`;
  }
}

async function getFilmDetails(movieId: number, apiKey: string): Promise<{ director: string, watchProvidersES: WatchProvider[] }> {
  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,watch/providers`;
  const response = await fetch(detailsUrl);
  const data = await response.json();

  const director = data.credits.crew.find((member: any) => member.job === "Director")?.name || "Director no disponible";

  const watchProvidersES = data["watch/providers"]?.results?.ES?.flatrate?.map(
    (provider: any) =>
      new WatchProvider(
        provider.logo_path,
        provider.provider_id,
        provider.provider_name,
        provider.display_priority
      )
  ) || [];

  return { director, watchProvidersES };
}


export const loadFilms = async (page: number, n:number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
  );
  const { results } = (await response.json()) as { results: any[] };
  const films: Array<Film> = [];
  for (const { id, title, release_date, poster_path, overview } of results) {
    const { director, watchProvidersES } = await getFilmDetails(id, apiKey);
   
    films.push(
      new Film(
        id,
        title,
        release_date,
        director,
        poster_path,
        overview,
        watchProvidersES
      )
    );
  }
  return films;
};


