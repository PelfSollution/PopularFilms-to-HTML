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

//la forma que he encontrado para obtener el director es con otra llamada a la api a la pagina credits
async function getDirector(movieId: number, apiKey: string): Promise<string> {
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  const response = await fetch(creditsUrl);
  const { crew } = await response.json();
  const director = crew.find((member: any) => member.job === "Director");
  return director ? director.name : "Director no disponible";
}

async function getWatchProviders(
  movieId: number,
  apiKey: string
): Promise<WatchProvider[]> {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const watchProvidersES = data?.results?.ES?.flatrate;
  return watchProvidersES
    ? watchProvidersES.map(
        (provider: any) =>
          new WatchProvider(
            provider.logo_path,
            provider.provider_id,
            provider.provider_name,
            provider.display_priority
          )
      )
    : [];
}

export const loadFilms = async (n: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`
  );
  const { results } = (await response.json()) as { results: any[] };
  const films: Array<Film> = [];
  for (const { id, title, release_date, poster_path, overview } of results) {
    const director = await getDirector(id, apiKey);
    const watchProvidersES = await getWatchProviders(id, apiKey);
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

//llamo a la funcion loadfilms para ver la salida de los datos
async function main() {
  try {
    const films = await loadFilms(1);
    console.log(films);
    await writeFile(
      "providersES.json",
      JSON.stringify(films, null, 2),
      "utf-8"
    );
    console.log("JSON guardado");
  } catch (error) {
    console.error("Error al cargar las películas:", error);
  }
}

main();
